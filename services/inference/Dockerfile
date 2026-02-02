FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p services/inference
COPY app ./services/inference/app

RUN touch services/__init__.py services/inference/__init__.py services/inference/app/__init__.py

ENV PYTHONPATH=/app

EXPOSE 8001
CMD ["python", "-m", "uvicorn", "services.inference.app.server:app", "--host", "0.0.0.0", "--port", "8001"]
