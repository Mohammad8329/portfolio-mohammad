from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import ContactMessage
from models.schemas import ContactRequest, ContactResponse
import smtplib
from email.message import EmailMessage
import os

router = APIRouter()

def send_email_notification(name: str, sender_email: str, message: str):
    email_address = os.getenv("EMAIL_ADDRESS")
    email_password = os.getenv("EMAIL_PASSWORD")
    
    if not email_address or not email_password:
        print("Email credentials not found in backend/.env. Skipping email notification.")
        return

    msg = EmailMessage()
    msg.set_content(f"New message from your portfolio website!\n\nName: {name}\nEmail: {sender_email}\n\nMessage:\n{message}")

    msg['Subject'] = f"Portfolio Contact: {name}"
    msg['From'] = email_address
    msg['To'] = os.getenv("RECEIVER_EMAIL", email_address)

    try:
        # Connect to Gmail SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(email_address, email_password)
        server.send_message(msg)
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

@router.post("/contact", response_model=ContactResponse)
async def contact_endpoint(request: ContactRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        new_message = ContactMessage(
            name=request.name,
            email=request.email,
            message=request.message
        )
        db.add(new_message)
        db.commit()

        # Add the email sending task to the background queue
        background_tasks.add_task(send_email_notification, request.name, request.email, request.message)

        return ContactResponse(
            status="success", 
            message="Message sent successfully! Mohammad will get back to you soon."
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to save message")
