#!/usr/bin/env sh
set -e

VENV_DIR=".venv"
VENV_NAME="FarmerNetVenv"
PYTHON_VERSION_FILE=".python-version"
REQUIREMENTS_FILE="requirements.txt"

# Check required files
if [ ! -f "$PYTHON_VERSION_FILE" ]; then
  echo "Missing .python-version file"
  exit 1
fi

if [ ! -f "$REQUIREMENTS_FILE" ]; then
  echo "Missing requirements.txt file"
  exit 1
fi

PYTHON_VERSION=$(cat "$PYTHON_VERSION_FILE" | tr -d '[:space:]')

if [ -z "$PYTHON_VERSION" ]; then
  echo ".python-version is empty"
  exit 1
fi

# Try to find the correct Python executable
PYTHON_BIN=""

if command -v "python$PYTHON_VERSION" >/dev/null 2>&1; then
  PYTHON_BIN="python$PYTHON_VERSION"
elif command -v "python${PYTHON_VERSION%.*}" >/dev/null 2>&1; then
  PYTHON_BIN="python${PYTHON_VERSION%.*}"
else
  echo "Python $PYTHON_VERSION not found in PATH"
  exit 1
fi

echo "Using $PYTHON_BIN"

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_DIR/$VENV_NAME/bin" ]; then
  echo "Creating virtual environment in $VENV_DIR/$VENV_NAME"
  "$PYTHON_BIN" -m venv "$VENV_DIR/$VENV_NAME"
else
  echo "Virtual environment already exists"
fi

# Activate virtual environment
# shellcheck source=/dev/null
. "./$VENV_DIR/$VENV_NAME/bin/activate"

echo "Upgrading pip"
pip install --upgrade pip

echo "Installing dependencies"
pip install -r "$REQUIREMENTS_FILE"

echo "Virtual environment ready"
echo "Activate later with: source $VENV_DIR/$VENV_NAME/bin/activate"
