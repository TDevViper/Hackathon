from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import news, risk

app = FastAPI(title="SupplyGuard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router)
app.include_router(risk.router)

@app.get("/")
def root():
    return {"status": "SupplyGuard API running"}
