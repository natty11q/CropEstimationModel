def estimate(payload, mode="dummy"):
    """
    Framework-agnostic crop yield estimator.
    Returns the `data` object exactly as defined in the contract.
    """
    area = payload["farm"]["area_hectares"]
    crop = payload["crop"]["crop_type"]
    season = payload["season"]["season_id"]

    if mode == "dummy":
        t_ha = 2.85
        return {
            "crop_type": crop,
            "season_id": season,
            "yield": {
                "estimated_yield_t_ha": t_ha,
                "estimated_total_yield_tons": t_ha * area,
                "range_t_ha": [2.3, 3.4],
            },
            "risk": {
                "risk_level": "medium",
                "alerts": [
                    {"code": "UNDERPERFORMANCE_RISK", "message": "Yield may fall below expected range."}
                ],
            },
            "confidence": {"confidence_score": 0.78},
            "source": "ai",
            "model": {"name": "crop-yield-estimator", "version": "1.0.0"},
        }

    # fallback placeholder
    t_ha = 2.1
    return {
        "crop_type": crop,
        "season_id": season,
        "yield": {
            "estimated_yield_t_ha": t_ha,
            "estimated_total_yield_tons": t_ha * area,
            "range_t_ha": [1.6, 2.8],
        },
        "risk": {
            "risk_level": "high",
            "alerts": [
                {"code": "LOW_DATA_MODE", "message": "Baseline estimate used due to limited data."}
            ],
        },
        "confidence": {"confidence_score": 0.42},
        "source": "fallback",
        "model": {"name": "baseline-heuristic", "version": "1.0.0"},
    }