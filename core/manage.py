#!/usr/bin/env python
import os
import sys
from pathlib import Path

def main():
    # core/ directory
    base_dir = Path(__file__).resolve().parent

    # Ensure Python can import the Django project package under core/apps/<project>
    sys.path.insert(0, str(base_dir))                 # core/
    sys.path.insert(0, str(base_dir / "apps"))        # core/apps/

    # Django settings module (project folder is core/apps/FarmerNetPredictionModel/)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "FarmerNetPredictionModel.settings")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Django is not installed or not available in this environment."
        ) from exc

    execute_from_command_line(sys.argv)

if __name__ == "__main__":
    main()
