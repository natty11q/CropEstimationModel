FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p services/worker
COPY app ./services/worker/app

RUN touch services/__init__.py services/worker/__init__.py services/worker/app/__init__.py

ENV PYTHONPATH=/app

CMD ["python", "-m", "services.worker.app.worker"]

