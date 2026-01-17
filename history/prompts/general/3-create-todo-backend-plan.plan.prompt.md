---
id: 3-create-todo-backend-plan
title: Create Todo Backend Plan
stage: plan
date_iso: 2026-01-18
surface: agent
model: Claude Sonnet 4.5
feature: todo-backend
branch: main
user: husbantech12
command: /sp.plan
labels: ["backend", "plan", "todo-app", "api", "fastapi"]
links:
  spec: "specs/2-todo-backend/spec.md"
  plan: "specs/2-todo-backend/plan.md"
  tasks: "specs/2-todo-backend/tasks.md"
files_yaml:
  - "specs/2-todo-backend/research.md"
  - "specs/2-todo-backend/data-model.md"
  - "specs/2-todo-backend/contracts/api-contract.md"
  - "specs/2-todo-backend/quickstart.md"
  - "specs/2-todo-backend/constitution-check.md"
tests_yaml: []
---

# Create Todo Backend Plan

## User Input

```
# backend.sp.plan
name: hackathon-todo-backend-plan
version: "1.0"
description: Backend implementation plan for Hackathon II Todo App using FastAPI, SQLModel, Neon PostgreSQL, and JWT authentication.

tasks:
  - name: setup_project
    description: Initialize backend folder structure, virtual environment, and dependencies.
    steps:
      - Create folder structure:
          - main.py
          - models.py
          - db.py
          - routes/
          - CLAUDE.md
      - Initialize Python project (`python -m venv venv`, `pip install fastapi uvicorn sqlmodel psycopg2-binary python-jose pydantic`)
      - Create `.env` file with `DATABASE_URL` and `BETTER_AUTH_SECRET`

  - name: setup_database
    description: Configure database connection and models
    steps:
      - In db.py, setup SQLModel connection to Neon PostgreSQL using DATABASE_URL
      - Define `User` and `Task` models in models.py following `sp.specify` schema
      - Create indexes on tasks.user_id and tasks.completed
      - Test database connection

  - name: configure_jwt_auth
    description: Setup JWT authentication middleware
    steps:
      - Create JWT utility functions to encode/decode tokens using BETTER_AUTH_SECRET
      - Add middleware in main.py to extract JWT from Authorization header
      - Decode token to get `user_id` and inject into request context
      - Return 401 Unauthorized for missing/invalid JWT

  - name: implement_task_crud_endpoints
    description: Implement all REST API endpoints for task management
    steps:
      - GET /api/{user_id}/tasks
          - Filter tasks by `user_id` from JWT
          - Support query params `status` and `sort`
      - POST /api/{user_id}/tasks
          - Validate title and description
          - Create task associated with authenticated user
      - GET /api/{user_id}/tasks/{id}
          - Return task details if owned by authenticated user
      - PUT /api/{user_id}/tasks/{id}
          - Update task fields
          - Enforce ownership check
      - DELETE /api/{user_id}/tasks/{id}
          - Delete task if owned by user
      - PATCH /api/{user_id}/tasks/{id}/complete
          - Toggle task completion status
          - Enforce ownership check

  - name: error_handling
    description: Add consistent error handling
    steps:
      - Use HTTPException for invalid requests, missing data, or unauthorized access
      - Return JSON response with error message and status code

  - name: testing_backend
    description: Test backend functionality
    steps:
      - Test JWT authentication (valid, expired, missing token)
      - Test all CRUD endpoints with Postman or HTTP client
      - Verify user isolation (user can only access their tasks)
      - Test database queries for filtering, sorting, and task ownership

  - name: documentation
    description: Add backend documentation for future developers
    steps:
      - Update backend/CLAUDE.md with instructions on folder structure, API endpoints, database, JWT usage
      - Reference relevant `sp.specify` for database, API, and JWT details
      - Add example curl commands for each endpoint

dependencies:
  - setup_project -> setup_database
  - setup_database -> configure_jwt_auth
  - configure_jwt_auth -> implement_task_crud_endpoints
  - implement_task_crud_endpoints -> error_handling
  - error_handling -> testing_backend
  - testing_backend -> documentation
```

## Response Summary

Successfully created comprehensive implementation plan for the Todo Backend API with all required supporting documents:

1. **Research** (`research.md`): Justified technology choices and architectural decisions
2. **Data Model** (`data-model.md`): Defined entity relationships and constraints
3. **API Contract** (`contracts/api-contract.md`): Detailed endpoint specifications and response formats
4. **Quickstart Guide** (`quickstart.md`): Setup and usage instructions
5. **Constitution Check** (`constitution-check.md`): Verified compliance with project standards

The implementation plan follows all the specified requirements from the user input, utilizing FastAPI, SQLModel, Neon PostgreSQL, and JWT authentication. The architecture ensures proper user isolation and implements all required CRUD endpoints with appropriate error handling.

## Outcome

Complete implementation plan ready for development team to execute. All architectural decisions are documented and justified, with clear specifications for each component.