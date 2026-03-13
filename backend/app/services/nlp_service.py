import os, json, requests
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL   = os.getenv("OLLAMA_URL",   "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

PROMPT_TEMPLATE = """You are a supply chain risk analyst.
Classify this news headline and reply ONLY with valid JSON — no extra text, no explanation.

JSON format:
{{"risk": "high" or "medium" or "low", "category": "weather" or "war" or "transport" or "politics", "country": "country name"}}

Headline: {headline}"""


def classify_headline(headline: str) -> dict:
    """Send headline to local Ollama model. Returns risk classification dict."""
    try:
        res = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model":  OLLAMA_MODEL,
                "prompt": PROMPT_TEMPLATE.format(headline=headline),
                "stream": False,
            },
            timeout=30,
        )
        raw = res.json().get("response", "").strip()

        # Strip markdown fences if model adds them
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]

        return json.loads(raw)

    except json.JSONDecodeError:
        # If model gives bad JSON, return safe default
        return {"risk": "medium", "category": "transport", "country": "Unknown"}

    except Exception as e:
        print(f"Ollama error: {e}")
        return {"risk": "low", "category": "politics", "country": "Unknown"}
