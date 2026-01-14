from pydantic import BaseModel
from typing import Optional, Any, Dict

class InferRequest(BaseModel):
    model: str
    input: Dict[str, Any]
    parameters: Optional[Dict[str, Any]] = None

class InferResponse(BaseModel):
    model: str
    output: Any
    usage: Optional[Dict[str, Any]] = None
    request_id: Optional[str] = None

class JobCreateRequest(BaseModel):
    model: str
    input: Dict[str, Any]
    parameters: Optional[Dict[str, Any]] = None

class JobCreateResponse(BaseModel):
    job_id: str
    status: str

class JobStatusResponse(BaseModel):
    job_id: str
    status: str
    result: Optional[Any]