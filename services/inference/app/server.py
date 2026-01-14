from fastapi import FastAPI
from services.inference.app.routers.infer import router as infer_router
from services.inference.app.routers.health import router as health_router

app = FastAPI(title="Inference Service", version="1.0.0")
app.include_router(health_router)
app.include_router(infer_router, prefix="/v1")