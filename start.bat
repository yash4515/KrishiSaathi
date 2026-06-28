@echo off
echo =========================================
echo   KrishiSaathi - Local Dev Startup
echo =========================================
echo.

:: Check if node_modules exist
if not exist "node_modules\" (
    echo [1/4] Installing frontend dependencies...
    npm install
) else (
    echo [1/4] Frontend dependencies OK
)

if not exist "server\node_modules\" (
    echo [2/4] Installing backend dependencies...
    cd server
    npm install
    cd ..
) else (
    echo [2/4] Backend dependencies OK
)

if not exist "AI-Service\.venv\" (
    echo [3/4] Creating Python virtual environment...
    cd AI-Service
    python -m venv .venv
    .venv\Scripts\pip install -r requirements.txt
    cd ..
) else (
    echo [3/4] Python venv OK
)

echo [4/4] Starting all services...
echo.
echo  - Frontend  → http://localhost:5173
echo  - Backend   → http://localhost:8000
echo  - AI Service → http://localhost:5005
echo  - API Docs  → http://localhost:5005/docs
echo.

:: Start AI Service in new window
start "KrishiSaathi AI Service" cmd /k "cd AI-Service && .venv\Scripts\python -m uvicorn app:app --host 0.0.0.0 --port 5005 --reload"

:: Start Backend in new window
start "KrishiSaathi Backend" cmd /k "cd server && node server.js"

:: Start Frontend
echo Starting Vite frontend (this window)...
npm run dev
