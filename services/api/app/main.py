from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

from services.api.app.api.v1.routes import router as v1_router

app = FastAPI(title="AI Platform API", version="1.0.0")
app.include_router(v1_router, prefix="/v1")

@app.get("/health")
def health():
    return {"ok": True}

# --- Add this block to enable "Authorize" in Swagger ---
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description="AI Platform API",
        routes=app.routes,
    )

    # Define API Key auth (header)
    openapi_schema["components"]["securitySchemes"] = {
        "ApiKeyAuth": {
            "type": "apiKey",
            "in": "header",
            "name": "X-API-Key",
        }
    }

    # Apply globally (Swagger will show Authorize)
    openapi_schema["security"] = [{"ApiKeyAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
