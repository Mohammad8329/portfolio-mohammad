from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    status: str
    message: str
