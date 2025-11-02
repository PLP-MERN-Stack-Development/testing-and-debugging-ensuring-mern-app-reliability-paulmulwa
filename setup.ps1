# MERN Bug Tracker - Setup Script
# Run this script to install all dependencies and verify the setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MERN Bug Tracker - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $scriptPath

Write-Host "Project Root: $projectRoot" -ForegroundColor Yellow
Write-Host ""

# Install Backend Dependencies
Write-Host "Step 1: Installing Backend Dependencies..." -ForegroundColor Green
Set-Location "$projectRoot\backend"
if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ Backend package.json not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install Frontend Dependencies
Write-Host "Step 2: Installing Frontend Dependencies..." -ForegroundColor Green
Set-Location "$projectRoot\frontend"
if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ Frontend package.json not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Create .env file if it doesn't exist
Write-Host "Step 3: Setting up environment variables..." -ForegroundColor Green
Set-Location "$projectRoot\backend"
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Write-Host ""

# Run Backend Tests
Write-Host "Step 4: Running Backend Tests..." -ForegroundColor Green
Set-Location "$projectRoot\backend"
npm test
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ All backend tests passed!" -ForegroundColor Green
} else {
    Write-Host "⚠ Some backend tests failed - please review" -ForegroundColor Yellow
}

Write-Host ""

# Run Frontend Tests
Write-Host "Step 5: Running Frontend Tests..." -ForegroundColor Green
Set-Location "$projectRoot\frontend"
npm test -- --watchAll=false
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ All frontend tests passed!" -ForegroundColor Green
} else {
    Write-Host "⚠ Some frontend tests failed - please review" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Start the backend server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "2. In a new terminal, start the frontend:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open your browser to http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see README.md or QUICKSTART.md" -ForegroundColor Cyan

Set-Location $projectRoot
