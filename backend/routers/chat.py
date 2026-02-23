import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import ChatSession, ChatMessage
from models.schemas import ChatRequest, ChatResponse
from services.resume_context import RESUME_PROMPT
from services.openrouter import get_chat_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    # Get or create session
    session_id = request.session_id
    if not session_id:
        new_session = ChatSession()
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        session_id = new_session.id
    else:
        # Verify session exists
        session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if not session:
            new_session = ChatSession(id=session_id)
            db.add(new_session)
            db.commit()

    # Save user message
    user_msg = ChatMessage(session_id=session_id, role="user", content=request.message)
    db.add(user_msg)
    db.commit()

    # Fetch history
    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == session_id
    ).order_by(ChatMessage.timestamp).limit(10).all()

    # Build messages array
    messages = [{"role": "system", "content": RESUME_PROMPT}]
    for msg in history:
        messages.append({"role": msg.role, "content": msg.content})

    # Call AI
    ai_response_text = await get_chat_response(messages)

    # Save AI message
    ai_msg = ChatMessage(session_id=session_id, role="assistant", content=ai_response_text)
    db.add(ai_msg)
    db.commit()

    return ChatResponse(response=ai_response_text, session_id=session_id)
