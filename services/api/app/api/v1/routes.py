from fastapi import APIRouter, Depends
from .schemas import InferRequest, InferResponse, JobCreateRequest, JobCreateResponse, JobStatusResponse
from services.api.app.clients.inference_client import infer_sync
from services.api.app.core.security import require_api_key
from services.api.app.core.rate_limit import rate_limit

router = APIRouter()

@router.post("/infer", response_model=InferResponse, dependencies=[Depends(require_api_key), Depends(rate_limit)])
async def infer(req: InferRequest):
    result = await infer_sync(req)
    return InferResponse(**result)

@router.post("/jobs", response_model=JobCreateResponse, dependencies=[Depends(require_api_key), Depends(rate_limit)])
async def create_job(req: JobCreateRequest):
    # enqueue job here (Celery/RQ/etc)
    return JobCreateResponse(job_id="job_123", status="queued")

@router.get("/jobs/{job_id}", response_model=JobStatusResponse, dependencies=[Depends(require_api_key)])
async def job_status(job_id: str):
    # fetch job status/results
    return JobStatusResponse(job_id=job_id, status="running", result=None)