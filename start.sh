#!/bin/bash
set -e

echo "========================================="
echo "  KrishiSaathi - Local Dev Startup"
echo "========================================="

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "[1/4] Installing frontend dependencies..."
  npm install
else
  echo "[1/4] Frontend dependencies OK"
fi

if [ ! -d "server/node_modules" ]; then
  echo "[2/4] Installing backend dependencies..."
  cd server && npm install && cd ..
else
  echo "[2/4] Backend dependencies OK"
fi

if [ ! -d "AI-Service/.venv" ]; then
  echo "[3/4] Creating Python virtual environment..."
  cd AI-Service
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt
  cd ..
else
  echo "[3/4] Python venv OK"
fi

echo "[4/4] Starting all services..."
echo ""
echo "  Frontend   → http://localhost:5173"
echo "  Backend    → http://localhost:8000"
echo "  AI Service → http://localhost:5000"
echo "  API Docs   → http://localhost:5000/docs"
echo ""

# Start AI Service in background
cd AI-Service
.venv/bin/python -m uvicorn app:app --host 0.0.0.0 --port 5000 &
AI_PID=$!
cd ..

# Start Backend in background
cd server
node server.js &
BACKEND_PID=$!
cd ..

# Start Frontend (foreground)
npm run dev

# Cleanup on exit
kill $AI_PID $BACKEND_PID 2>/dev/null
