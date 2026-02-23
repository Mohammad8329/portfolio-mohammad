from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, contact
from database.db import init_db

app = FastAPI(title="Mohammad Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    init_db()

app.include_router(chat.router, prefix="/api")
app.include_router(contact.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
