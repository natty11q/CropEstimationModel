class DummyModel:
    def predict(self, input_data, parameters=None):
        return {"echo": input_data, "parameters": parameters or {}}

class ModelRegistry:
    def __init__(self):
        self._models = {"dummy": DummyModel()}  # swap to HF/ONNX/TensorRT later

    def get(self, name: str):
        if name not in self._models:
            raise KeyError(f"Unknown model: {name}")
        return self._models[name]