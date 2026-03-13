import os, json, re, requests
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL   = os.getenv("OLLAMA_URL",   "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

PROMPT_TEMPLATE = """Classify this supply chain news headline.

Reply with ONLY a JSON object on a single line. No explanation. No markdown.

Example output: {{"risk":"high","category":"weather","country":"China"}}

Rules:
- risk: must be exactly "high", "medium", or "low"
- category: must be exactly "weather", "war", "transport", or "politics"  
- country: the main country mentioned (e.g. "China", "Germany", "India")

Headline: {headline}

JSON:"""


def classify_headline(headline: str) -> dict:
    """Send headline to local Ollama model. Returns risk classification dict."""
    try:
        res = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model":  OLLAMA_MODEL,
                "prompt": PROMPT_TEMPLATE.format(headline=headline),
                "stream": False,
                "options": {"temperature": 0}   # deterministic output
            },
            timeout=30,
        )
        raw = res.json().get("response", "").strip()
        print(f"[Ollama raw] {headline[:40]}... → {raw[:80]}")

        # Try to extract JSON from anywhere in the response
        match = re.search(r'\{[^}]+\}', raw)
        if match:
            raw = match.group(0)

        result = json.loads(raw)

        # Validate fields — reject Unknown country
        risk     = result.get("risk",     "medium")
        category = result.get("category", "transport")
        country  = result.get("country",  "")

        if risk not in ("high", "medium", "low"):
            risk = "medium"
        if category not in ("weather", "war", "transport", "politics"):
            category = "transport"
        if not country or country.lower() in ("unknown", "n/a", ""):
            # Extract country from headline as fallback
            country = _extract_country(headline)

        return {"risk": risk, "category": category, "country": country}

    except Exception as e:
        print(f"[Ollama error] {e} — raw was: {locals().get('raw','')}")
        return {"risk": "medium", "category": "transport", "country": _extract_country(headline)}


# Simple keyword fallback if model fails to identify country
COUNTRY_KEYWORDS = {
    "China": ["china", "chinese", "yangtze", "beijing", "shanghai"],
    "Germany": ["germany", "german", "rotterdam", "berlin"],
    "Taiwan": ["taiwan", "strait"],
    "India": ["india", "indian"],
    "Ukraine": ["ukraine", "ukrainian"],
    "USA": ["us-mexico", "us ", "american", "united states"],
    "Brazil": ["brazil", "brazilian"],
    "Singapore": ["singapore"],
    "Suez": ["suez", "egypt"],
    "Japan": ["japan", "japanese"],
}

def _extract_country(headline: str) -> str:
    h = headline.lower()
    for country, keywords in COUNTRY_KEYWORDS.items():
        if any(k in h for k in keywords):
            return country
    return "Global"