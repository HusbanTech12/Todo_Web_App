# Todo Backend API Documentation

## Overview
This is the backend API for the Todo application. It provides REST endpoints for managing user tasks with JWT authentication.

## Tech Stack
- Framework: FastAPI
- ORM: SQLModel
- Database: PostgreSQL (Neon)
- Authentication: JWT tokens issued by Better Auth frontend

## Folder Structure
- `main.py`: FastAPI application entry point
- `models/`: SQLModel database models
- `routes/`: API route definitions
- `auth/`: Authentication utilities
- `utils/`: Helper functions
- `db.py`: Database connection and session management
- `config.py`: Configuration management

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for verifying JWT tokens from Better Auth

## API Endpoints
- `GET /api/{user_id}/tasks`: Retrieve user's tasks
- `POST /api/{user_id}/tasks`: Create a new task
- `GET /api/{user_id}/tasks/{id}`: Get specific task
- `PUT /api/{user_id}/tasks/{id}`: Update a task
- `DELETE /api/{user_id}/tasks/{id}`: Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete`: Toggle task completion

## Authentication
All endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```