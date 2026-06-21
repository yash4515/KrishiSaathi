# 🌾 KrishiSaathi — Trusted Digital Partner for Farming Success

<div align="center">

![KrishiSaathi Banner](https://img.shields.io/badge/KrishiSaathi-AgriTech-green?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-green?style=flat-square&logo=node.js)
![Python](https://img.shields.io/badge/Python-3.12-yellow?style=flat-square&logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

**KrishiSaathi is a full-stack AgriTech platform connecting farmers and buyers with AI-powered crop disease detection, real-time bidding, digital marketplace, insurance, and multilingual support.**

[Live Demo](#) · [Report Bug](https://github.com/yash4515/KrishiSaathi/issues) · [Request Feature](https://github.com/yash4515/KrishiSaathi/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Disease Detection** | Upload a leaf photo → CNN model detects disease & gives treatment |
| 🛒 **Digital Marketplace** | Farmers list crops; buyers browse & bid in real-time |
| 📦 **Order Management** | Full order lifecycle with payment via Razorpay |
| 🌦️ **Agri Store** | Buy seeds, fertilizers, tools from a curated store |
| 🛡️ **Crop Insurance** | Browse and apply for government/private insurance schemes |
| 💬 **AI Chat Support** | 24/7 AI-powered farming assistant |
| 📰 **Krishi Samachar** | Live agricultural news & market price updates |
| 🌐 **Multilingual** | English, Hindi, Marathi support with i18next |
| 🎙️ **Voice Commands** | Voice-based crop upload and navigation |

---

## 🏗️ Architecture

```
KrishiSaathi/
├── src/                    # React 19 + Vite frontend
│   ├── pages/              # All route pages (LandingPage, DiseaseDetectionPage, etc.)
│   ├── components/         # Reusable UI components
│   ├── services/           # Axios API clients
│   ├── context/            # AuthContext (JWT-based auth)
│   ├── hooks/              # Custom React hooks
│   └── locales/            # i18n translation files (en, hi, mr)
│
├── server/                 # Node.js + Express backend (Port 8000)
│   ├── routes/             # API routes (auth, crops, detection, orders…)
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas (User, Crop, Order, Detection…)
│   ├── middlewares/        # JWT auth, rate limiting, error handling
│   └── services/           # External integrations (Cloudinary, Razorpay)
│
└── AI-Service/             # Python FastAPI AI microservice (Port 5000)
    ├── app.py              # FastAPI server with /predict and /health endpoints
    ├── train.py            # MobileNetV2 transfer learning training script
    ├── treatments.json     # Treatment database for 38 disease classes
    └── requirements.txt    # Python dependencies
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **MongoDB** (local or Atlas)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yash4515/KrishiSaathi.git
cd KrishiSaathi
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:8000/api

# Start development server
npm run dev
# → Runs on http://localhost:5173
```

### 3. Backend (Node.js) Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env
# Fill in MongoDB URI, JWT secret, Cloudinary, Razorpay keys

# Start backend server
npm start
# → Runs on http://localhost:8000
```

### 4. AI Service Setup
```bash
cd AI-Service

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start AI microservice (Demo Mode - no model needed)
uvicorn app:app --host 0.0.0.0 --port 5000
# → Runs on http://localhost:5000
```

### 5. (Optional) Train the Disease Detection Model
```bash
# First, download the PlantVillage dataset
git clone https://github.com/spMohanty/PlantVillage-Dataset
mv PlantVillage-Dataset/raw AI-Service/raw

# Train the model (requires ~2–4 hours on CPU, ~30 min with GPU)
cd AI-Service
python train.py
# Model saved to AI-Service/model/plant_disease_model.h5
```

---

## 🌍 Environment Variables

### Frontend (`/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (`/server/.env`)
```env
PORT=8000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/krishisaathi
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIENT_URL=https://your-frontend-domain.com
```

---

## ☁️ Hosting & Deployment

### Frontend → Vercel (Recommended)
1. Import the repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `/` (project root)
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
6. Deploy!

### Backend → Render
1. Create a **Web Service** on [render.com](https://render.com)
2. Connect the GitHub repo
3. Set **Root Directory**: `server`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add all environment variables from `server/.env.example`
7. Deploy!

### AI Service → Render (or Railway)
1. Create another **Web Service** on Render
2. Set **Root Directory**: `AI-Service`
3. Set **Build Command**: `pip install -r requirements.txt`
4. Set **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. Deploy! (Runs in Demo mode unless model is pre-trained)

### Database → MongoDB Atlas
1. Create a free cluster on [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist `0.0.0.0/0` for cloud access
3. Copy the connection string to `MONGODB_URI`

---

## 🤖 Disease Detection — AI Model Details

The AI service uses **MobileNetV2 transfer learning** trained on the **PlantVillage dataset** (54,306 leaf images, 38 disease classes across 14 crops).

| Crop | Diseases Detected |
|---|---|
| Apple | Apple Scab, Black Rot, Cedar Apple Rust, Healthy |
| Tomato | 9 diseases including Late Blight, Leaf Mold, Mosaic Virus |
| Corn | Cercospora, Common Rust, Northern Blight, Healthy |
| Grape | Black Rot, Esca, Leaf Blight, Healthy |
| Potato | Early Blight, Late Blight, Healthy |
| + 9 more | Blueberry, Cherry, Orange, Peach, Pepper, Raspberry, Soybean, Squash, Strawberry |

> **Demo Mode**: If no trained model is found, the AI service runs in smart demo mode, returning realistic predictions based on treatment data.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TailwindCSS, Framer Motion, i18next |
| Backend | Node.js, Express 5, MongoDB, Mongoose, JWT, Socket.IO |
| AI Service | Python 3.12, FastAPI, TensorFlow 2.21, MobileNetV2, Pillow |
| Storage | Cloudinary (images), MongoDB Atlas (data) |
| Payments | Razorpay |
| Deployment | Vercel (frontend), Render (backend + AI), MongoDB Atlas |

---

## 📸 Screenshots

> Coming soon — see the live demo for the full UI experience.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Yash Mishra**
- GitHub: [@yash4515](https://github.com/yash4515)
- Project: [KrishiSaathi](https://github.com/yash4515/KrishiSaathi)

---

<div align="center">Made with ❤️ for Indian Farmers 🌾</div>
