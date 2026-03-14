# SupplyGuard — AI Supply Chain Risk Monitor

## Quick Start

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

### Optional: AI Classification (Ollama)
Install Ollama from https://ollama.ai then run:
```bash
ollama pull phi3:mini
ollama serve
```
Without Ollama the app uses a built-in rule-based classifier automatically.
