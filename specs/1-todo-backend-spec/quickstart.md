# Todo Backend Quickstart Guide

## Prerequisites
- Python 3.8+
- pip package manager
- Neon PostgreSQL account
- Better Auth configuration

## Setup Instructions

### 1. Environment Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi sqlmodel python-jose[cryptography] python-dotenv uvicorn
```

### 2. Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@ep-xxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
BETTER_AUTH_SECRET=your_jwt_secret_key
```

### 3. Project Structure
```
/backend
  main.py          # FastAPI application entry point
  db.py            # Database connection setup
  models.py        # SQLModel definitions
  routes/
    tasks.py       # Task-related API endpoints
  auth.py          # JWT authentication utilities
```

## Running the Application
```bash
# Start the development server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

## Key Components

### Authentication
All endpoints require JWT authentication. The user_id is extracted from the JWT token's 'sub' claim.

### Database Models
SQLModel is used for all database operations. The Task model includes user_id for enforcing data isolation.

### Error Handling
Standard HTTP status codes are used for all responses. Errors are returned in JSON format.

## API Endpoints
- GET `/api/tasks` - List all user tasks
- POST `/api/tasks` - Create new task
- GET `/api/tasks/{id}` - Get specific task
- PUT `/api/tasks/{id}` - Update task
- DELETE `/api/tasks/{id}` - Delete task
- PATCH `/api/tasks/{id}/complete` - Toggle task completion