import os
import uuid
import httpx
from typing import Any, Dict

INFERENCE_URL = os.getenv("INFERENCE_URL", "http://inference:8001")

def _mock_infer(req: Any) -> Dict[str, Any]:
    """
    Demo fallback response when inference service is not running.
    Must match InferResponse schema: {model, output, usage?, request_id?}
    """
    model_name = getattr(req, "model", "demo-yield-model")

    # Put whatever you want inside output; schema allows Any.
    output = {
        "predicted_yield_t_ha": 3.8,
        "confidence": 0.86,
        "risk_level": "LOW",
        "reasons": ["Demo mode: inference service not available"],
    }

    return {
        "model": model_name,
        "output": output,
        "usage": {"mode": "mock"},
        "request_id": str(uuid.uuid4()),
    }

async def infer_sync(req: Any) -> Dict[str, Any]:
    """
    Try real inference first. If it fails (service down), return mock output.
    """
    payload = req.model_dump() if hasattr(req, "model_dump") else dict(req)

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(f"{INFERENCE_URL}/infer", json=payload)
            resp.raise_for_status()
            return resp.json()
    except Exception:
        # Fallback to mock result for local demo/testing
        return _mock_infer(req)
