from fastapi import APIRouter
from app.services.risk_engine import build_risk_report

router = APIRouter()

@router.get("/risk")
def get_risk():
    """Return aggregated risk per country with coordinates for map."""
    return build_risk_report()
