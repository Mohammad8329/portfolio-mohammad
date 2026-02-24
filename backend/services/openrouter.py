import httpx
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

# Multiple free models — tried in order until one succeeds
MODELS = [
    "deepseek/deepseek-r1:free",
    "meta-llama/llama-3-8b-instruct:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemini-2.0-pro-exp-02-05:free",
]

async def get_chat_response(messages: list[dict]) -> str:
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    if not OPENROUTER_API_KEY:
        print("Error: OpenRouter API key not configured in environment variables.")
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
                    print(f"Model {model} failed with status {response.status_code}")
                    continue

                if response.status_code != 200:
                    print(f"Model {model} failed with status {response.status_code}: {response.text}")
                    continue

                data = response.json()
                if "choices" in data and len(data["choices"]) > 0:
                    return data["choices"][0]["message"]["content"]

            except Exception as e:
                print(f"Exception using model {model}: {str(e)}")
                continue  # Try next model on any error

        return "All AI models are currently busy. Please try again in a moment."

