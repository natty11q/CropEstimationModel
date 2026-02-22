from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
import uuid
import datetime

@api_view(['POST'])
def predict(request):
    data = request.data["input"]
    # result = model.predict(data)
    print("!! Python recieved post request !!")
    return Response({"result": "test output"})



@api_view(["POST"])
def echo(request):
    # This string "only exists in python" (generated here)
    py_only = f"py-token-{uuid.uuid4()}-{datetime.datetime.utcnow().isoformat()}"

    print("\n=== DJANGO RECEIVED REQUEST ===")
    print("Body:", request.data)
    print("Generated python-only string:", py_only)
    print("==============================\n")

    return Response({"python_string": py_only})