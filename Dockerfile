# Backend API Service
FROM python:3.12-slim as backend

WORKDIR /app

# Copy backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code while excluding .env file
COPY backend/main.py .
COPY backend/models/ ./models/
COPY backend/routes/ ./routes/
COPY backend/auth/ ./auth/
COPY backend/schemas/ ./schemas/
COPY backend/services/ ./services/
COPY backend/utils/ ./utils/
COPY backend/config.py .
COPY backend/db.py .
COPY backend/startup.py .
COPY backend/exceptions/ ./exceptions/

# Create a default .env file for Docker environment (will be overridden by docker-compose anyway)
RUN echo "DATABASE_URL=postgresql://postgres:password@db:5432/todo_db" > .env && \
    echo "BETTER_AUTH_SECRET=docker_secret" >> .env

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]