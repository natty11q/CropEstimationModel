from rest_framework import serializers

class FarmLocationSerializer(serializers.Serializer):
    lat = serializers.FloatField(required=False)
    lon = serializers.FloatField(required=False)

class FarmSerializer(serializers.Serializer):
    farm_id = serializers.CharField(required=False)
    location = FarmLocationSerializer(required=False)
    area_hectares = serializers.FloatField(required=True)

class CropSerializer(serializers.Serializer):
    crop_type = serializers.CharField(required=True)

class SeasonSerializer(serializers.Serializer):
    season_id = serializers.CharField(required=True)

class OptionsSerializer(serializers.Serializer):
    mode = serializers.ChoiceField(choices=["dummy", "live"], required=False, default="dummy")

class CropYieldEstimateRequestSerializer(serializers.Serializer):
    request_id = serializers.CharField()
    farm = FarmSerializer()
    crop = CropSerializer()
    season = SeasonSerializer()
    options = OptionsSerializer(required=False)
