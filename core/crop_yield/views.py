from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CropYieldEstimateRequestSerializer
from crop_yield.estimate import estimate


class CropYieldEstimateView(APIView):
    def post(self, request):
        ser = CropYieldEstimateRequestSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        payload = ser.validated_data

        mode = payload.get("options", {}).get("mode", "dummy")
        data = estimate(payload, mode=mode)

        return Response(
            {
                "request_id": payload["request_id"],
                "success": True,
                "data": data,
                "errors": [],
            },
            status=status.HTTP_200_OK,
        )
