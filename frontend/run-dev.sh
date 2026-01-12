#!/bin/bash

# Script to run the Todo App frontend in development mode using Docker

echo "🚀 Starting Todo App Frontend in development mode..."
echo ""

# Check if docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Docker is not installed or not in PATH."
  echo "Please install Docker Desktop or Docker Engine first."
  exit 1
fi

# Check if docker daemon is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker daemon is not running."
  echo "Please start Docker Desktop or the Docker service."
  exit 1
fi

echo "✅ Docker is available and running."

# Build and start the container
echo ""
echo "📦 Building and starting the container..."
echo ""

if [ "$1" = "-d" ] || [ "$1" = "--detached" ]; then
  docker-compose up --build -d
  echo ""
  echo "✅ Application is running in detached mode!"
  echo "🌐 Access the application at: http://localhost:3000"
  echo ""
  echo "💡 To stop the application, run: docker-compose down"
else
  docker-compose up --build
fi