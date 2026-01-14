import requests

class AIPlatformClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.headers = {"Authorization": f"Bearer {api_key}"}

    def infer(self, model: str, input: dict, parameters: dict | None = None):
        payload = {"model": model, "input": input, "parameters": parameters}
        r = requests.post(f"{self.base_url}/v1/infer", json=payload, headers=self.headers, timeout=60)
        r.raise_for_status()
        return r.json()