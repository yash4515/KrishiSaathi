# 🚀 KrishiSaathi Deployment Guide

> Complete step-by-step guide to host KrishiSaathi on the web for **free** using Vercel, Render, and MongoDB Atlas.

---

## Overview

KrishiSaathi has **3 components** to deploy:

| Component | Technology | Host | URL Pattern |
|---|---|---|---|
| **Frontend** | React + Vite | Vercel | `krishisaathi.vercel.app` |
| **Backend API** | Node.js + Express | Render | `krishisaathi-backend.onrender.com` |
| **AI Service** | Python FastAPI | Render | `krishisaathi-ai.onrender.com` |
| **Database** | MongoDB | MongoDB Atlas | `cluster.mongodb.net` |

---

## Step 1 — MongoDB Atlas (Database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → Sign up / Log in
2. Create a **Free Cluster** (M0 tier — permanently free)
3. In **Database Access** → Add a new user with a strong password
4. In **Network Access** → Add IP `0.0.0.0/0` to allow connections from anywhere
5. Click **Connect** → **Drivers** → Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/krishisaathi
   ```
6. Save this — you'll need it in the next step

---

## Step 2 — Backend API on Render

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **New** → **Web Service**
3. Connect your GitHub repo: `yash4515/KrishiSaathi`
4. Configure:
   - **Name**: `krishisaathi-backend`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Add **Environment Variables** (click "Add Environment Variable"):

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | `mongodb+srv://...` (from Step 1) |
   | `JWT_SECRET` | Any long random string (e.g., `openssl rand -hex 32`) |
   | `JWT_EXPIRES_IN` | `7d` |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
   | `CLOUDINARY_API_KEY` | Your Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
   | `RAZORPAY_KEY_ID` | Your Razorpay key ID |
   | `RAZORPAY_KEY_SECRET` | Your Razorpay key secret |
   | `CLIENT_URL` | `https://krishisaathi.vercel.app` (set after Step 4) |
   | `AI_SERVICE_URL` | `https://krishisaathi-ai.onrender.com` (set after Step 3) |

6. Click **Create Web Service** and wait for the deploy (~3 min)
7. Note your backend URL: `https://krishisaathi-backend.onrender.com`

---

## Step 3 — AI Service on Render

1. On Render, click **New** → **Web Service** again
2. Connect the same GitHub repo: `yash4515/KrishiSaathi`
3. Configure:
   - **Name**: `krishisaathi-ai`
   - **Root Directory**: `AI-Service`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
4. No extra environment variables needed (runs in demo mode by default)
5. Click **Create Web Service** → wait for deploy (~5 min due to TensorFlow)
6. Note your AI URL: `https://krishisaathi-ai.onrender.com`
7. ✅ Go back to the Backend service → update `AI_SERVICE_URL` to this URL

---

## Step 4 — Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project** → Import `yash4515/KrishiSaathi`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variable**:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://krishisaathi-backend.onrender.com/api` |

5. Click **Deploy** → wait ~2 min
6. Your site is live at `https://krishisaathi.vercel.app` (or custom domain)
7. ✅ Go back to the Backend service → update `CLIENT_URL` to your Vercel URL

---

## Step 5 — Cloudinary (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com) → Sign up free
2. Dashboard → Copy your **Cloud Name**, **API Key**, **API Secret**
3. Add these to the Backend environment variables on Render

---

## Step 6 — Razorpay (Payments)

1. Go to [razorpay.com](https://razorpay.com) → Sign up
2. Settings → API Keys → Generate Test Mode Keys
3. Copy **Key ID** and **Key Secret**
4. Add these to the Backend environment variables on Render
5. For production, complete KYC on Razorpay and switch to Live mode keys

---

## Step 7 — Custom Domain (Optional)

### Vercel (Frontend)
1. In your Vercel project → Settings → Domains
2. Add your domain (e.g., `krishisaathi.in`)
3. Update DNS records as instructed

### Render (Backend)
1. In your Render service → Settings → Custom Domains
2. Add `api.krishisaathi.in`
3. Update DNS with the CNAME provided

---

## Verification Checklist

After all deployments, verify:

- [ ] `https://krishisaathi.vercel.app` loads the landing page
- [ ] `https://krishisaathi-backend.onrender.com/api/health` returns `{"status":"ok"}`
- [ ] `https://krishisaathi-ai.onrender.com/health` returns `{"status":"ok","demo_mode":true}`
- [ ] User registration works (`/signup`)
- [ ] User login works (`/login`)
- [ ] Disease detection works (`/detect` — upload any leaf image)
- [ ] Marketplace loads crop listings

---

## Troubleshooting

### Frontend shows "Failed to fetch" errors
→ Check `VITE_API_URL` is set correctly in Vercel (no trailing slash)
→ Ensure backend CORS `CLIENT_URL` matches your Vercel domain exactly

### Backend can't connect to MongoDB
→ Verify Atlas Network Access has `0.0.0.0/0` whitelisted
→ Double-check the connection string format and password (escape special chars with `%`)

### AI Service times out on first request
→ Render free tier services "sleep" after 15 min of inactivity
→ First request after sleep takes ~30 seconds — this is normal
→ The frontend has a 30-second timeout for the detect endpoint

### Disease detection returns 503 error
→ AI Service may not be running — check Render logs
→ Backend `AI_SERVICE_URL` must point to the correct Render AI service URL

---

## Cost Summary

| Service | Free Tier |
|---|---|
| Vercel | Free — unlimited static deploys |
| Render (Backend) | Free — 512MB RAM, sleeps after 15 min |
| Render (AI Service) | Free — 512MB RAM, sleeps after 15 min |
| MongoDB Atlas | Free — 512MB storage |
| Cloudinary | Free — 25GB storage, 25GB bandwidth/month |
| Razorpay | Free — 2% transaction fee on payments |

> **Total monthly cost: ₹0** for development/portfolio use 🎉

---

*For production at scale, consider upgrading Render to Starter plan (₹600/month) to eliminate cold starts.*
