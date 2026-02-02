FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Create python package structure expected by imports: services.api.app...
RUN mkdir -p services/api
COPY app ./services/api/app

# Ensure packages are recognized
RUN touch services/__init__.py services/api/__init__.py services/api/app/__init__.py

ENV PYTHONPATH=/app

EXPOSE 8000
CMD ["python", "-m", "uvicorn", "services.api.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
