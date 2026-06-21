"""
KrishiSaathi — Plant Disease Detection API
FastAPI server that loads a trained CNN model and predicts crop diseases.
Falls back to demo mode if the model is not yet trained.

Usage:
    uvicorn app:app --host 0.0.0.0 --port 5000

Endpoints:
    GET  /health   → service health check
    GET  /info     → API information and supported crops
    POST /predict  → multipart form: image file
"""

import os
import sys
import json
import random
from io import BytesIO

# Fix Windows console Unicode encoding for emoji logging
try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# ─── Paths ───
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model', 'plant_disease_model.h5')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'model', 'class_names.json')
TREATMENTS_PATH = os.path.join(BASE_DIR, 'treatments.json')

IMG_SIZE = 224
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

# ─── Global state ───
model = None
class_names = {}
treatments = {}
demo_mode = False


def load_resources():
    global model, class_names, treatments, demo_mode

    # Always load treatments
    if os.path.exists(TREATMENTS_PATH):
        with open(TREATMENTS_PATH, 'r', encoding='utf-8') as f:
            treatments = json.load(f)
        print(f"[OK] Loaded {len(treatments)} treatment entries")
    else:
        print("[WARN] treatments.json not found — predictions will have no treatment info")

    # Try to load trained model
    if os.path.exists(MODEL_PATH):
        try:
            os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
            import tensorflow as tf
            print("[INFO] Loading trained model...")
            model = tf.keras.models.load_model(MODEL_PATH)
            print("[OK] Model loaded successfully")

            if os.path.exists(CLASS_NAMES_PATH):
                with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
                    class_names = json.load(f)
                print(f"[OK] Loaded {len(class_names)} class names")

            demo_mode = False
        except Exception as e:
            print(f"[WARN] Failed to load model: {e}")
            print("[INFO] Falling back to DEMO mode")
            demo_mode = True
    else:
        print("[INFO] No trained model found — running in DEMO mode")
        print("[INFO] To train: python train.py")
        demo_mode = True


# ─── FastAPI App ───
app = FastAPI(
    title="KrishiSaathi Disease Detection API",
    description=(
        "AI-powered crop disease detection from leaf images. "
        "Supports 38 disease classes across 14 crop species using MobileNetV2. "
        "Falls back to smart demo mode when no trained model is available."
    ),
    version="1.1.0",
    contact={"name": "KrishiSaathi Team", "url": "https://github.com/yash4515/KrishiSaathi"},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    load_resources()


@app.get("/health", tags=["Monitoring"])
async def health():
    """Service health check — returns model status and mode."""
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "demo_mode": demo_mode,
        "disease_classes": len(treatments),
        "version": "1.1.0",
    }


@app.get("/info", tags=["Monitoring"])
async def info():
    """Returns supported crops and disease classes."""
    crops = sorted(set(v["crop"] for v in treatments.values()))
    diseases = sorted(set(v["disease"] for v in treatments.values() if v["disease"] != "Healthy"))
    return {
        "supported_crops": crops,
        "total_classes": len(treatments),
        "disease_classes": len(diseases),
        "image_size": f"{IMG_SIZE}x{IMG_SIZE}",
        "max_file_size_mb": MAX_FILE_SIZE // (1024 * 1024),
        "mode": "model" if not demo_mode else "demo",
    }


def demo_predict(filename: str):
    """Smart demo prediction based on filename keywords, or random selection."""
    filename_lower = filename.lower() if filename else ""

    # Try to match crop name from filename
    matched_keys = []
    for key in treatments:
        crop_part = key.split("___")[0].lower().replace("_", " ").replace(",", "")
        disease_part = key.split("___")[-1].lower().replace("_", " ")
        if crop_part in filename_lower or disease_part in filename_lower:
            matched_keys.append(key)

    # If no match, pick common disease classes (not healthy) for realism
    if not matched_keys:
        disease_keys = [k for k in treatments if "healthy" not in k.lower()]
        matched_keys = random.sample(disease_keys, min(3, len(disease_keys)))

    chosen_key = random.choice(matched_keys)
    info = treatments[chosen_key]

    return {
        "crop": info["crop"],
        "disease": info["disease"],
        "confidence": round(random.uniform(0.78, 0.96), 4),
        "treatment": info["treatment"],
        "class_key": chosen_key,
        "demo": True,
    }


@app.post("/predict", tags=["Detection"])
async def predict(image: UploadFile = File(...)):
    """
    Predict crop disease from a leaf image.

    - Accepts JPEG, PNG, WEBP images up to 10MB
    - Returns crop name, disease, confidence score, and treatment advice
    - If no model is trained, returns a smart demo prediction
    """
    # Validate MIME type
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image (JPEG, PNG, WEBP, etc.)")

    try:
        contents = await image.read()

        # Validate file size
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail=f"File too large. Maximum size is {MAX_FILE_SIZE // (1024*1024)}MB.")

        # ─── Real model prediction ───
        if model is not None and not demo_mode:
            import numpy as np
            from PIL import Image

            img = Image.open(BytesIO(contents)).convert("RGB")
            img = img.resize((IMG_SIZE, IMG_SIZE))
            img_array = np.array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            predictions = model.predict(img_array, verbose=0)
            predicted_idx = int(np.argmax(predictions[0]))
            confidence = float(predictions[0][predicted_idx])

            class_key = class_names.get(str(predicted_idx), "Unknown")
            info = treatments.get(class_key, {})

            return {
                "success": True,
                "data": {
                    "crop": info.get("crop", class_key.split("___")[0].replace("_", " ")),
                    "disease": info.get("disease", class_key.split("___")[-1].replace("_", " ")),
                    "confidence": round(confidence, 4),
                    "treatment": info.get("treatment", "Consult a local agronomist for diagnosis."),
                    "class_key": class_key,
                    "demo": False,
                }
            }

        # ─── Demo mode prediction ───
        result = demo_predict(image.filename or "unknown.jpg")
        return {
            "success": True,
            "data": result,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
