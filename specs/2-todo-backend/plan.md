# Todo Backend Implementation Plan

## Architecture Overview

This plan outlines the implementation of a FastAPI backend for the Todo application with JWT authentication, task CRUD operations, and Neon PostgreSQL database integration.

## Technical Stack

- **Framework**: FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT tokens issued by Better Auth frontend
- **Language**: Python 3.12+

## Key Components

### 1. Database Layer
- **Models**: Define SQLModel models for tasks
- **Connection**: Configure database connection using DATABASE_URL
- **Session Management**: Implement dependency for database sessions

### 2. Authentication Layer
- **JWT Verification**: Middleware to verify JWT tokens using BETTER_AUTH_SECRET
- **User Extraction**: Extract user_id from JWT payload
- **Authorization**: Ensure users can only access their own resources

### 3. API Layer
- **Routes**: Implement REST endpoints for task operations
- **Validation**: Pydantic models for request/response validation
- **Error Handling**: Consistent error responses

### 4. Configuration
- **Environment Variables**: DATABASE_URL, BETTER_AUTH_SECRET
- **Settings**: Centralized configuration management

## Implementation Phases

### Phase 1: Setup and Configuration
1. Set up project structure
2. Configure database connection with SQLModel
3. Implement configuration management
4. Set up dependency injection

### Phase 2: Authentication System
1. Implement JWT verification utility
2. Create authentication dependency
3. Add user extraction from JWT
4. Implement middleware for token validation

### Phase 3: Data Models
1. Define Task model with required fields
2. Implement relationships between entities
3. Add validation and constraints

### Phase 4: API Endpoints
1. Implement GET /{user_id}/tasks with filtering and sorting
2. Implement POST /{user_id}/tasks for task creation
3. Implement GET /{user_id}/tasks/{id} for individual tasks
4. Implement PUT /{user_id}/tasks/{id} for updates
5. Implement DELETE /{user_id}/tasks/{id} for deletions
6. Implement PATCH /{user_id}/tasks/{id}/complete for toggling completion

### Phase 5: Security and Validation
1. Enforce user ownership of tasks
2. Add input validation
3. Implement error handling
4. Add logging

### Phase 6: Testing and Documentation
1. Write unit tests for core functionality
2. Document API endpoints
3. Add health checks
4. Performance testing

## Critical Files to Create

- `main.py`: FastAPI application entry point
- `models/task.py`: SQLModel definitions
- `schemas/task.py`: Pydantic schemas for validation
- `routes/tasks.py`: API route implementations
- `auth/dependencies.py`: Authentication utilities
- `utils/jwt.py`: JWT handling functions
- `config.py`: Configuration management
- `db.py`: Database connection and session management

## Environment Configuration

- DATABASE_URL: PostgreSQL connection string
- BETTER_AUTH_SECRET: Secret key for JWT verification
- Additional settings as needed

## Risk Assessment

- **Database Connection**: Ensure Neon PostgreSQL connection is stable
- **JWT Validation**: Verify compatibility with Better Auth JWT format
- **Security**: Prevent unauthorized access to other users' tasks
- **Performance**: Optimize database queries for large datasets