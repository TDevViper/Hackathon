import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
MODEL = os.getenv("GROQ_MODEL", "llama3-70b-8192")

PROMPT_TEMPLATE = """
Classify this supply chain news headline.

Return ONLY JSON with this format:
{{"risk":"high","category":"weather","country":"China"}}

Rules:
risk must be: high, medium, or low
category must be: weather, war, transport, politics

Headline: {headline}

JSON:
"""


def classify_headline(headline: str):

    prompt = PROMPT_TEMPLATE.format(headline=headline)

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0
            },
            timeout=30
        )

        data = response.json()

        print("Groq response:", data)

        if "choices" not in data:
            print("Groq API error:", data)
            return fallback_result(headline)

        raw = data["choices"][0]["message"]["content"]

        try:
            return json.loads(raw)
        except:
            return fallback_result(headline)

    except Exception as e:
        print("AI request failed:", e)
        return fallback_result(headline)


def fallback_result(headline: str):

    headline_lower = headline.lower()

    if "flood" in headline_lower:
        return {"risk": "high", "category": "weather", "country": "China"}

    if "strike" in headline_lower:
        return {"risk": "high", "category": "transport", "country": "Germany"}

    if "typhoon" in headline_lower:
        return {"risk": "medium", "category": "weather", "country": "Japan"}

    return {
        "risk": "medium",
        "category": "transport",
        "country": "Global"
    }