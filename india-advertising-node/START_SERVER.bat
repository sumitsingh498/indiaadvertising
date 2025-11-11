@echo off
REM India Advertising - Node.js Server Launcher
REM This script starts the Node.js backend server on localhost:5000

echo.
echo ========================================
echo  India Advertising - Node.js Backend
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

REM Get the directory of this script
cd /d "%~dp0"

echo Starting Node.js server...
echo.
echo Server will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
node index.js

pause
