import json
from collections import defaultdict
from app.services.nlp_service import classify_headline


COUNTRY_COORDS = {
    "China": {"lat": 35.8, "lng": 104.1},
    "Germany": {"lat": 51.1, "lng": 10.4},
    "Japan": {"lat": 36.2, "lng": 138.2},
    "Taiwan": {"lat": 23.7, "lng": 121.0},
    "Global": {"lat": 0, "lng": 0}
}

RISK_PRIORITY = {"low": 1, "medium": 2, "high": 3}


def load_news():
    with open("app/data/sample_news.json") as f:
        return json.load(f)


def calculate_risk():

    news = load_news()

    country_events = defaultdict(list)

    for item in news:

        headline = item.get("title", "")

        result = classify_headline(headline)

        # Safe extraction (prevents crashes)
        country = result.get("country", "Global")
        risk = result.get("risk", "medium")

        country_events[country].append({
            "headline": headline,
            "risk": risk
        })

    results = []

    for country, events in country_events.items():

        # Ensure risk value exists
        highest = max(
            events,
            key=lambda x: RISK_PRIORITY.get(x["risk"], 1)
        )

        coords = COUNTRY_COORDS.get(country, {"lat": 0, "lng": 0})

        results.append({
            "country": country,
            "risk": highest["risk"],
            "event": highest["headline"],
            "lat": coords["lat"],
            "lng": coords["lng"]
        })

    return results