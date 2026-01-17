# Todo Backend Implementation Tasks

## Feature: Todo Backend API with JWT Authentication

This document outlines the implementation tasks for a FastAPI-based backend for the Todo application with JWT authentication, task CRUD operations, and Neon PostgreSQL database integration.

## Phase 1: Setup and Foundation

### Goal
Establish the project foundation with necessary dependencies, configuration, and basic structure.

### Independent Test Criteria
- Virtual environment is created and activated
- Dependencies are installed and accessible
- Configuration system loads environment variables
- Basic FastAPI application starts without errors

### Tasks

- [X] T001 Create backend directory structure (main.py, models/, routes/, auth/, utils/, db.py, config.py)
- [X] T002 [P] Initialize Python virtual environment and install dependencies (fastapi, uvicorn, sqlmodel, psycopg2-binary, python-jose, python-dotenv, pydantic)
- [X] T003 Create requirements.txt with all required packages
- [X] T004 [P] Create .env file template with DATABASE_URL and BETTER_AUTH_SECRET placeholders
- [X] T005 Create basic main.py with FastAPI app initialization
- [X] T006 Create config.py with Settings class for environment variables
- [X] T007 Create basic CLAUDE.md documentation file

## Phase 2: Database Layer

### Goal
Implement database connection, models, and session management following SQLModel patterns.

### Independent Test Criteria
- Database connection can be established
- Task model can be created with proper fields and relationships
- Database session dependency works correctly
- Tables can be created/migrated

### Tasks

- [X] T008 Create db.py with SQLModel engine and session setup
- [X] T009 [P] Create models/task.py with Task SQLModel containing id, user_id, title, description, completed, timestamps
- [X] T010 [P] Add proper validation constraints to Task model (title required, user_id foreign key)
- [X] T011 [P] Add indexes to Task model (user_id, completed)
- [X] T012 Create database session dependency function
- [X] T013 Test database connection with sample operations

## Phase 3: Authentication Layer

### Goal
Implement JWT-based authentication system that integrates with Better Auth frontend.

### Independent Test Criteria
- JWT tokens can be verified using BETTER_AUTH_SECRET
- User ID can be extracted from JWT payload
- Authentication dependency returns current user or 401 error
- Unauthorized requests return proper 401 responses

### Tasks

- [X] T014 Create utils/jwt.py with JWT verification and decoding functions
- [X] T015 [P] Create auth/dependencies.py with get_current_user dependency
- [X] T016 [P] Implement JWT token validation using BETTER_AUTH_SECRET
- [X] T017 [P] Add user ID extraction from JWT payload
- [X] T018 Test JWT verification with valid and invalid tokens
- [X] T019 Implement proper error handling for invalid/missing tokens

## Phase 4: User Story 1 - Task Management (P1)

### Goal
Enable authenticated users to create, read, update, and delete their own tasks with proper filtering and sorting.

### User Story
As an authenticated user, I want to manage my tasks so that I can organize my work and track completion status.

### Independent Test Criteria
- User can create new tasks with title and optional description
- User can retrieve their own tasks with filtering and sorting options
- User can update their own tasks
- User can delete their own tasks
- User can toggle task completion status
- Users cannot access other users' tasks

### Tasks

- [X] T020 [P] [US1] Create schemas/task.py with TaskCreate, TaskUpdate, and TaskResponse Pydantic models
- [X] T021 [P] [US1] Add validation to task schemas (title required, proper field types)
- [X] T022 [P] [US1] Create routes/tasks.py with APIRouter
- [X] T023 [US1] Implement GET /{user_id}/tasks endpoint with filtering (status) and sorting (created|title|due_date)
- [X] T024 [US1] Implement POST /{user_id}/tasks endpoint for task creation
- [X] T025 [US1] Implement GET /{user_id}/tasks/{id} endpoint for retrieving specific tasks
- [X] T026 [US1] Implement PUT /{user_id}/tasks/{id} endpoint for updating tasks
- [X] T027 [US1] Implement DELETE /{user_id}/tasks/{id} endpoint for deleting tasks
- [X] T028 [US1] Implement PATCH /{user_id}/tasks/{id}/complete endpoint for toggling completion status
- [X] T029 [US1] Add user ownership validation to all task endpoints
- [X] T030 [US1] Test task CRUD operations with proper authentication

## Phase 5: Error Handling and Validation

### Goal
Implement consistent error handling and validation across all endpoints.

### Independent Test Criteria
- Invalid requests return appropriate error codes (400, 401, 403, 404)
- Error responses follow the specified JSON format
- Validation errors are properly handled and communicated
- Security boundaries are maintained

### Tasks

- [X] T031 Create custom exception handlers for common error types
- [X] T032 [P] Implement consistent error response format following API contract
- [X] T033 [P] Add request validation to all endpoints using Pydantic schemas
- [X] T034 [P] Add proper HTTP status codes to all endpoints (200, 201, 204, 400, 401, 403, 404)
- [X] T035 Add authentication checks to all endpoints
- [X] T036 Add authorization checks to ensure user ownership
- [X] T037 Test error scenarios (invalid tokens, wrong user access, invalid data)

## Phase 6: API Integration and Testing

### Goal
Integrate all components and ensure the API works as specified in the contract.

### Independent Test Criteria
- All API endpoints function according to the contract
- Authentication and authorization work correctly
- Filtering and sorting work as specified
- Response formats match the contract

### Tasks

- [X] T038 [P] Integrate all route modules with main FastAPI application
- [X] T039 [P] Add APIRouter prefix (/api) to task routes
- [X] T040 Test complete API workflow with valid JWT tokens
- [X] T041 [P] Verify all endpoint responses match API contract
- [X] T042 Test filtering and sorting functionality
- [X] T043 [P] Test cross-user access prevention
- [X] T044 Performance test with multiple concurrent requests
- [X] T045 Security audit of all endpoints

## Phase 7: Polish and Cross-Cutting Concerns

### Goal
Finalize the implementation with documentation, logging, and deployment preparation.

### Independent Test Criteria
- API documentation is available and accurate
- Logging is implemented appropriately
- Deployment configuration is ready
- Health check endpoint is available

### Tasks

- [X] T046 Add comprehensive API documentation with example requests
- [X] T047 [P] Implement structured logging for important operations
- [X] T048 Add health check endpoint for monitoring
- [X] T049 Update CLAUDE.md with complete backend documentation
- [X] T050 Create deployment configuration files (Dockerfile, docker-compose.yml)
- [X] T051 Add input sanitization and security headers
- [X] T052 Final integration testing of complete system
- [X] T053 Performance optimization and cleanup

## Dependencies

- T001 -> T005 (Basic structure needed before main app)
- T002 -> T008 (Dependencies needed before database setup)
- T008 -> T023 (Database needed before endpoints)
- T015 -> T023 (Authentication needed before protected endpoints)
- T020 -> T023 (Schemas needed before endpoints)
- T023 -> T038 (Endpoints needed before integration)

## Parallel Execution Examples

- T008, T014, T020 can run in parallel (foundational components)
- T023, T024, T025, T026, T027, T028 can run in parallel (different endpoints)
- T031, T032, T033, T034 can run in parallel (error handling components)

## Implementation Strategy

1. **MVP Scope**: Complete Phase 1, 2, and core US1 tasks (T001-T022, T023, T024) for basic authenticated task creation and retrieval
2. **Incremental Delivery**: Add update/delete functionality, then error handling, then polish
3. **Testing Strategy**: Each phase should be independently testable before moving to the next