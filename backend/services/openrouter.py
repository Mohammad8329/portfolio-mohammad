import httpx
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "mistralai/mistral-7b-instruct:free"

async def get_chat_response(messages: list[dict]) -> str:
    if not OPENROUTER_API_KEY:
        return "Error: OpenRouter API key not configured."

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                BASE_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "HTTP-Referer": "https://mohammad-portfolio.pages.dev",
                    "X-Title": "Mohammad Portfolio",
                    "Content-Type": "application/json"
                },
                json={
                    "model": MODEL,
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                return f"API Error: {response.text}"
                
            data = response.json()
            if "choices" in data and len(data["choices"]) > 0:
                return data["choices"][0]["message"]["content"]
            else:
                return "I'm having trouble thinking right now. Please try again."
        except Exception as e:
            return f"Error communicating with AI engine: {str(e)}"
