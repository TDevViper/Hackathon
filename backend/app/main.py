from fastapi import FastAPI
from app.routes.risk import router as risk_router

app = FastAPI()

app.include_router(risk_router)