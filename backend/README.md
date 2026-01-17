# Todo Backend API

This is a FastAPI-based backend service for managing todo tasks with JWT authentication and user isolation.

## Features

- JWT-based authentication and authorization
- Full CRUD operations for todo tasks
- User isolation (users can only access their own tasks)
- Input validation with Pydantic
- SQLModel ORM for database operations
- PostgreSQL database support

## Requirements

- Python 3.8+
- PostgreSQL database (Neon-compatible)

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

## Usage

Start the development server:
```bash
python -m backend.startup
```

Or with uvicorn directly:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a specific task
- `DELETE /api/tasks/{id}` - Delete a specific task
- `PATCH /api/tasks/{id}/complete` - Toggle completion status of a task
- `GET /api/health` - Health check endpoint

All endpoints (except health check) require JWT authentication in the Authorization header:
`Authorization: Bearer <your-jwt-token>`

## Database Models

### Task
- `id`: UUID (primary key)
- `user_id`: UUID (foreign key, links to authenticated user)
- `title`: String (max 255 characters, required)
- `description`: Text (optional)
- `completed`: Boolean (default: false)
- `created_at`: DateTime
- `updated_at`: DateTime