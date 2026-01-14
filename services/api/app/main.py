from fastapi import FastAPI
from services.api.app.api.v1.routes import router as v1_router

app = FastAPI(title="AI Platform API", version="1.0.0")
app.include_router(v1_router, prefix="/v1")

@app.get("/health")
def health():
    return {"ok": True}