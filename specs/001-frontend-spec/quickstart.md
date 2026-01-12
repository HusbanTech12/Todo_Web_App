# Quickstart Guide: Frontend for Todo App Phase II

## Prerequisites
- Node.js 18+ for frontend development
- Python 3.11+ for backend development
- PostgreSQL-compatible database (Neon recommended)
- Better Auth account/configured secret

## Setup Instructions

### 1. Clone and Initialize Repository
```bash
git clone <repository-url>
cd todo-web-app
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Update with your database and auth details
python -m src.main  # Start the backend server
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # Ensure BETTER_AUTH_SECRET matches backend
npm run dev  # Start the development server
```

### 4. Configuration
- Set `BETTER_AUTH_SECRET` in both frontend and backend environments
- Configure `DATABASE_URL` for backend
- Set API endpoint in frontend to point to backend

## Running the Application
- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:3000
- Better Auth handles authentication at /api/auth/*

## Key Commands
```bash
# Frontend
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production build

# Backend
uvicorn src.main:app --reload  # Development server
python -m pytest     # Run tests
```

## API Endpoints
- `GET /api/tasks` - Retrieve user's tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get specific task
- `PUT /api/tasks/{id}` - Update task
- `PATCH /api/tasks/{id}/complete` - Toggle completion status
- `DELETE /api/tasks/{id}` - Delete task

All endpoints require JWT authentication in Authorization header.