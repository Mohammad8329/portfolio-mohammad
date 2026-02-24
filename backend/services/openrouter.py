import httpx
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

# Multiple free models — tried in order until one succeeds
MODELS = [
    "deepseek/deepseek-r1-0528:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-3-27b-it:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "qwen/qwen3-coder:free",
]

async def get_chat_response(messages: list[dict]) -> str:
    if not OPENROUTER_API_KEY:
        return "Error: OpenRouter API key not configured."

    async with httpx.AsyncClient() as client:
        for model in MODELS:
            try:
                response = await client.post(
                    BASE_URL,
                    headers={
                        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                        "HTTP-Referer": os.getenv("SITE_URL", ""),
                        "X-Title": os.getenv("SITE_TITLE", ""),
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": model,
                        "messages": messages,
                        "max_tokens": 500,
                        "temperature": 0.7
                    },
                    timeout=30.0
                )

                # Skip to next model if unavailable or rate-limited
                if response.status_code in (404, 429):
                    continue

                if response.status_code != 200:
                    continue

                data = response.json()
                if "choices" in data and len(data["choices"]) > 0:
                    return data["choices"][0]["message"]["content"]

            except Exception:
                continue  # Try next model on any error

        return "All AI models are currently busy. Please try again in a moment."

