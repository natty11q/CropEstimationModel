from django.urls import path
from .views import CropYieldEstimateView

urlpatterns = [
    path("v1/ai/crop-yield/estimate", CropYieldEstimateView.as_view()),
]
