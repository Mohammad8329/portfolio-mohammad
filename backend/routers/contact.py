from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import ContactMessage
from models.schemas import ContactRequest, ContactResponse

router = APIRouter()

@router.post("/contact", response_model=ContactResponse)
async def contact_endpoint(request: ContactRequest, db: Session = Depends(get_db)):
    try:
        new_message = ContactMessage(
            name=request.name,
            email=request.email,
            message=request.message
        )
        db.add(new_message)
        db.commit()
        return ContactResponse(
            status="success", 
            message="Message saved successfully! Mohammad will get back to you soon."
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to save message")
