from django.urls import path, include

urlpatterns = [
    path("", include("crop_yield.urls")),
]
