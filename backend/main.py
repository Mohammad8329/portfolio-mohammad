from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, contact
from database.db import init_db

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Mohammad Portfolio API")

allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "")
if allowed_origins_str:
    allowed_origins = [origin.strip() for origin in allowed_origins_str.split(',')]
else:
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://mohammad-portfolio.pages.dev"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

@app.on_event("startup")
async def startup():
    init_db()

app.include_router(chat.router, prefix="/api")
app.include_router(contact.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
