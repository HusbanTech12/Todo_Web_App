---
id: 2-create-todo-backend-spec
title: Create Todo Backend Specification
stage: spec
date_iso: 2026-01-18
surface: agent
model: Claude Sonnet 4.5
feature: todo-backend
branch: main
user: husbantech12
command: /sp.specify
labels: ["backend", "specification", "todo-app", "api"]
links:
  spec: "specs/2-todo-backend/spec.md"
  plan: "specs/2-todo-backend/plan.md"
  tasks: "specs/2-todo-backend/tasks.md"
files_yaml:
  - "specs/2-todo-backend/spec.md"
  - "specs/2-todo-backend/plan.md"
  - "specs/2-todo-backend/tasks.md"
  - "specs/2-todo-backend/checklists/requirements.md"
tests_yaml: []
---

# Create Todo Backend Specification

## User Input

```
# backend.sp.specify
name: hackathon-todo-backend
version: "1.0"
description: |
  Backend specifications for Hackathon II Todo App.
  Implements REST API, JWT authentication, task CRUD operations,
  and uses FastAPI, SQLModel, and Neon PostgreSQL.

stack:
  backend:
    framework: FastAPI
    orm: SQLModel
    database: Neon Serverless PostgreSQL
    auth: JWT (issued by Better Auth on frontend)
  language: Python 3.12+

structure:
  main: main.py
  models: models.py
  routes: routes/
  db: db.py
  claude: CLAUDE.md

env_variables:
  - DATABASE_URL
  - BETTER_AUTH_SECRET

database:
  tables:
    users:
      description: Managed by Better Auth
      columns:
        - id: string, primary key
        - email: string, unique
        - name: string
        - created_at: timestamp
    tasks:
      columns:
        - id: integer, primary key
        - user_id: string, foreign key -> users.id
        - title: string, not null
        - description: text, nullable
        - completed: boolean, default false
        - created_at: timestamp
        - updated_at: timestamp
      indexes:
        - tasks.user_id
        - tasks.completed

api:
  base_url: /api
  auth_required: true
  auth_type: JWT
  endpoints:
    - method: GET
      path: /{user_id}/tasks
      description: List all tasks for authenticated user
      query_params:
        - status: "all|pending|completed"
        - sort: "created|title|due_date"
    - method: POST
      path: /{user_id}/tasks
      description: Create a new task
      body:
        title: string, required
        description: string, optional
    - method: GET
      path: /{user_id}/tasks/{id}
      description: Get task details
    - method: PUT
      path: /{user_id}/tasks/{id}
      description: Update a task
      body: updated task fields
    - method: DELETE
      path: /{user_id}/tasks/{id}
      description: Delete a task
    - method: PATCH
      path: /{user_id}/tasks/{id}/complete
      description: Toggle task completion

jwt_auth:
  workflow:
    - Frontend Better Auth issues JWT token on login
    - Include JWT in Authorization header for API calls
    - Backend verifies JWT using BETTER_AUTH_SECRET
    - Decode JWT to extract user_id
    - Filter tasks and operations by user_id
    - Token expires automatically (7 days recommended)

middleware:
  - verify_jwt: true
  - extract_user_info: true
  - enforce_task_ownership: true

api_conventions:
  - All responses in JSON
  - Use Pydantic models for request/response
  - Handle errors with HTTPException
  - 401 Unauthorized for requests without valid JWT

commands:
  run_backend: "uvicorn main:app --reload --port 8000"
```

## Response Summary

Created a complete specification for the Todo Backend API with the following artifacts:
- spec.md: Detailed functional and non-functional requirements
- plan.md: Implementation architecture and approach
- tasks.md: Actionable tasks broken down by implementation phases
- checklists/requirements.md: Quality validation checklist

The specification covers all required functionality including JWT authentication, task CRUD operations, filtering and sorting, and security requirements. The implementation plan follows the specified tech stack (FastAPI, SQLModel, Neon PostgreSQL) and addresses all API endpoints outlined in the requirements.

## Outcome

Successfully created comprehensive specification for the Todo Backend API following SDD methodology. The specification is ready for implementation planning.