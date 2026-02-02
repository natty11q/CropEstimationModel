import os
from fastapi import Header, HTTPException

API_KEY = os.getenv("API_KEY", "dev-key")

async def require_api_key(authorization: str = Header(default="")):
    """
    Expects: Authorization: Bearer <API_KEY>
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

    token = authorization.replace("Bearer ", "").strip()
    if token != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API key")

    return True
