from app.services.news_service import fetch_headlines
from app.services.nlp_service  import classify_headline

# Rough lat/lng for common countries
COUNTRY_COORDS = {
    "China":         (35.86,  104.19),
    "India":         (20.59,   78.96),
    "USA":           (37.09,  -95.71),
    "Germany":       (51.16,   10.45),
    "Russia":        (61.52,  105.31),
    "Ukraine":       (48.37,   31.16),
    "Taiwan":        (23.69,  120.96),
    "Japan":         (36.20,  138.25),
    "South Korea":   (35.90,  127.76),
    "Brazil":        (-14.23, -51.92),
    "UK":            (55.37,   -3.43),
    "France":        (46.22,    2.21),
    "Netherlands":   (52.13,    5.29),
    "Singapore":     (1.35,   103.81),
    "Australia":     (-25.27, 133.77),
    "Unknown":       (0.0,      0.0),
}

RISK_SCORE = {"high": 3, "medium": 2, "low": 1}


def build_risk_report() -> list[dict]:
    """Fetch headlines → classify each → aggregate by country → return risk list."""
    headlines = fetch_headlines()
    classified = []

    for item in headlines:
        result = classify_headline(item["title"])
        classified.append({
            **item,
            "risk":     result.get("risk",     "low"),
            "category": result.get("category", "transport"),
            "country":  result.get("country",  "Unknown"),
        })

    # Aggregate: highest risk per country wins
    country_map = {}
    for item in classified:
        c = item["country"]
        if c not in country_map or RISK_SCORE[item["risk"]] > RISK_SCORE[country_map[c]["risk"]]:
            country_map[c] = item

    # Build final risk list with coordinates
    risk_list = []
    for country, item in country_map.items():
        lat, lng = COUNTRY_COORDS.get(country, (0.0, 0.0))
        risk_list.append({
            "country":  country,
            "risk":     item["risk"],
            "event":    item["title"][:60] + "..." if len(item["title"]) > 60 else item["title"],
            "category": item["category"],
            "lat":      lat,
            "lng":      lng,
        })

    # Sort: high first
    risk_list.sort(key=lambda x: RISK_SCORE.get(x["risk"], 0), reverse=True)
    return risk_list
