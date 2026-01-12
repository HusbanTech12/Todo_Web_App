@echo off
REM Batch script to run the Todo App frontend in development mode using Docker

echo 🚀 Starting Todo App Frontend in development mode...
echo.

REM Check if docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed or not in PATH.
    echo Please install Docker Desktop first.
    exit /b 1
)

REM Check if docker daemon is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker daemon is not running.
    echo Please start Docker Desktop.
    exit /b 1
)

echo ✅ Docker is available and running.
echo.
echo 📦 Building and starting the container...
echo.

REM Build and start the container
docker-compose up --build

pause