# Mohammad N. Shaikh — AI Portfolio

A retro arcade 8-bit themed portfolio site featuring an AI-powered conversational NPC guide.

![INSERT COIN - PORTFOLIO]()

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Backend**: Python, FastAPI, SQLite, SQLAlchemy
- **AI**: OpenRouter API (`mistralai/mistral-7b-instruct:free`)

## Features

- **Retro UI:** CRT scanline overlay, pixel borders, typewriter RPG dialog effects, scrolling parallax tilemap.
- **AI NPC Guide:** Fully functional chatbot acting as an in-game NPC that answers questions purely based on the resume data.
- **Responsive:** Mobile-first game HUD layout and touch-friendly controls.

---

## 🚀 Setup Instructions

### 1. Backend (FastAPI + AI Chatbot)

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows
# or source venv/bin/activate # Mac/Linux

pip install -r requirements.txt
```

**Environment Variables:**
Create `backend/.env` with your API key:
```env
OPENROUTER_API_KEY=sk-or-...
DATABASE_URL=sqlite:///./portfolio.db
```

**Run Server:**
```bash
uvicorn main:app --reload --port 8000
```
API is accessible at `http://localhost:8000`.

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
```

**Run Server:**
```bash
npm run dev
```
Portfolio is accessible at `http://localhost:5173`.

---

## API Endpoints

- `GET /health` : Returns server status.
- `POST /api/chat` : Accepts `{ message: str, session_id: str }`, queries OpenRouter, saves state, returns `{ response: str, session_id: str }`.
- `POST /api/contact` : Accepts contact form fields and persists them to SQLite DB.

## Author

**Mohammad N. Shaikh**
- Email: shaikhmohummad86@gmail.com
- GitHub: [Mohammad8329](https://github.com/Mohammad8329)
