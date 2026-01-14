from fastapi import APIRouter
from pydantic import BaseModel
from services.inference.app.model_registry import ModelRegistry

router = APIRouter()
registry = ModelRegistry()

class InferRequest(BaseModel):
    model: str
    input: dict
    parameters: dict | None = None

@router.post("/infer")
async def infer(req: InferRequest):
    model = registry.get(req.model)
    return {"model": req.model, "output": model.predict(req.input, req.parameters)}