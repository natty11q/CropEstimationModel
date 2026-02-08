#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$VENV_DIR = ".venv"
$VENV_NAME = "FarmerNetVenv"
$PYTHON_VERSION_FILE = ".python-version"
$REQUIREMENTS_FILE = "requirements.txt"

$VenvPath = Join-Path $VENV_DIR $VENV_NAME
$ActivateScript = Join-Path $VenvPath "Scripts\Activate.ps1"

# Check required files
if (-not (Test-Path $PYTHON_VERSION_FILE)) {
    Write-Error "Missing .python-version file"
    exit 1
}

if (-not (Test-Path $REQUIREMENTS_FILE)) {
    Write-Error "Missing requirements.txt file"
    exit 1
}

$PYTHON_VERSION = (Get-Content $PYTHON_VERSION_FILE -Raw).Trim()

if ([string]::IsNullOrWhiteSpace($PYTHON_VERSION)) {
    Write-Error ".python-version is empty"
    exit 1
}

# Try to find the correct Python executable
# 1) python<major.minor.patch> (rare on Windows)
# 2) python<major.minor>
# 3) py launcher with -<major.minor>
# 4) python (fallback)

$PYTHON_CMD = $null

function Has-Command($name) {
    return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

if (Has-Command ("python$PYTHON_VERSION")) {
    $PYTHON_CMD = @("python$PYTHON_VERSION")
}
else {
    # major.minor from major.minor.patch
    $majorMinor = $PYTHON_VERSION
    if ($PYTHON_VERSION -match '^(\d+)\.(\d+)\.(\d+)$') {
        $majorMinor = "$($Matches[1]).$($Matches[2])"
    }

    if (Has-Command ("python$majorMinor")) {
        $PYTHON_CMD = @("python$majorMinor")
    }
    elseif (Has-Command "py") {
        # Windows Python Launcher: py -3.11
        $PYTHON_CMD = @("py", "-$majorMinor")
    }
    elseif (Has-Command "python") {
        $PYTHON_CMD = @("python")
    }
    elseif (Has-Command "python3") {
        $PYTHON_CMD = @("python3")
    }
    else {
        Write-Error "Python $PYTHON_VERSION not found in PATH (and no 'py' launcher found)"
        exit 1
    }
}

Write-Host ("Using: " + ($PYTHON_CMD -join " "))

# Create virtual environment if it doesn't exist
$VenvPython = Join-Path $VenvPath "Scripts\python.exe"
if (-not (Test-Path $VenvPython)) {
    Write-Host "Creating virtual environment in $VenvPath"
    New-Item -ItemType Directory -Force -Path $VENV_DIR | Out-Null
    & $PYTHON_CMD[0] @($PYTHON_CMD[1..($PYTHON_CMD.Length-1)]) -m venv $VenvPath
}
else {
    Write-Host "Virtual environment already exists"
}

# Activate virtual environment
if (-not (Test-Path $ActivateScript)) {
    Write-Error "Activation script not found: $ActivateScript"
    exit 1
}

. $ActivateScript

# Ensure pip is healthy
Write-Host "Upgrading/reinstalling pip"
python -m pip install --upgrade --force-reinstall pip

# Install dependencies
Write-Host "Installing dependencies"
pip install --upgrade -r $REQUIREMENTS_FILE

Write-Host "Virtual environment ready"
Write-Host "Activate later with: `n  $ActivateScript"
