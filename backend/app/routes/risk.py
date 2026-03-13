from fastapi import APIRouter
from app.services.risk_engine import calculate_risk

router = APIRouter()

@router.get("/risk")
def get_risk():
    return calculate_risk()