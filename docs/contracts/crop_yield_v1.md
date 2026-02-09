# Farmanet AI — Crop Yield Estimation Contract (v1)

## Endpoint
POST /v1/ai/crop-yield/estimate

## Purpose
On every successful response, the service must return:
1) Estimated yield
2) Risk alerts
3) Production confidence score

---

## Request: CropYieldEstimateRequest

### Required fields
- request_id (string)
- farm.area_hectares (number > 0)
- crop.crop_type (string)
- season.season_id (string)
- Either:
  - farm.farm_id (string), OR
  - farm.location.lat + farm.location.lon (numbers)

### Optional fields
- farm.location.region, farm.location.district, farm.soil_type
- crop.variety, crop.planting_date
- history.past_seasons, history.past_yields_t_ha
- climate.rainfall_mm, climate.avg_temp_c, climate.drought_risk
- options.mode (dummy | live)

### Request example
```json
{
  "request_id": "req_0001",
  "farm": { "farm_id": "FARM_1", "area_hectares": 2.5 },
  "crop": { "crop_type": "maize" },
  "season": { "season_id": "2025-major" },
  "options": { "mode": "dummy" }
}