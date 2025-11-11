# India Advertising - Node.js Server Launcher (PowerShell)
# Usage: .\START_SERVER.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " India Advertising - Node.js Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Get the directory of this script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "✓ Node.js found: $(node --version)" -ForegroundColor Green
Write-Host ""
Write-Host "Starting Node.js server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 Server URL: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📖 Testing Guide: $scriptDir\LOCALHOST_TESTING.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
node index.js

Write-Host ""
Write-Host "Server stopped." -ForegroundColor Yellow
Read-Host "Press Enter to exit"
