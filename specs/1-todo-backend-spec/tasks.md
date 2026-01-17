# Todo Backend API Implementation Tasks

## Feature: Todo Backend API with JWT Authentication and User Isolation

This document outlines the implementation tasks for the todo backend API, focusing on JWT authentication, user isolation, and task CRUD operations using FastAPI and SQLModel.

## Dependencies
- Python 3.x
- FastAPI
- SQLModel
- Pydantic
- python-jose
- uvicorn
- python-dotenv
- Neon PostgreSQL

## Phase 1: Setup
Initialize project structure and dependencies.

- [X] T001 Create /backend directory structure
- [X] T002 Create requirements.txt with FastAPI, SQLModel, Pydantic, python-jose, python-dotenv
- [X] T003 Create .env file with DATABASE_URL and BETTER_AUTH_SECRET placeholders
- [X] T004 Create .gitignore for Python project and environment files

## Phase 2: Foundational
Core infrastructure that all user stories depend on.

- [X] T005 Set up database connection in /backend/db.py
- [X] T006 [P] Create environment configuration in /backend/config.py
- [X] T007 [P] Initialize FastAPI application in /backend/main.py
- [X] T008 Create JWT utility functions in /backend/utils/jwt.py
- [X] T009 Create authentication dependency in /backend/auth/dependencies.py
- [X] T010 Create base SQLModel in /backend/models/base.py

## Phase 3: [US1] Task Creation
As an authenticated user, I want to create new tasks so that I can add items to my todo list.

### Story Goal
Enable authenticated users to create new tasks with proper validation and user isolation.

### Independent Test Criteria
- Can authenticate with JWT and create a new task
- Task is assigned to the authenticated user
- Title validation (max 255 chars) is enforced
- Completed status defaults to false

### Implementation Tasks
- [X] T011 [US1] Create Task SQLModel in /backend/models/task.py
- [X] T012 [US1] Create TaskCreate request model in /backend/schemas/task.py
- [X] T013 [US1] Create TaskResponse response model in /backend/schemas/task.py
- [X] T014 [US1] Create task service with create_task method in /backend/services/task.py
- [X] T015 [US1] Implement POST /api/tasks endpoint in /backend/routes/tasks.py
- [X] T016 [US1] Add authentication to POST /api/tasks endpoint
- [X] T017 [US1] Validate title length (max 255 chars) in task creation
- [X] T018 [US1] Set default completion status to false in task creation

## Phase 4: [US2] Task Retrieval
As an authenticated user, I want to retrieve my tasks so that I can see what I need to do.

### Story Goal
Enable authenticated users to retrieve only their own tasks with proper user isolation.

### Independent Test Criteria
- Can authenticate and retrieve only my own tasks
- Cannot access tasks belonging to other users
- Response includes all required task fields

### Implementation Tasks
- [X] T019 [US2] Create TaskListResponse schema in /backend/schemas/task.py
- [X] T020 [US2] Add get_tasks_by_user method to task service in /backend/services/task.py
- [X] T021 [US2] Implement GET /api/tasks endpoint in /backend/routes/tasks.py
- [X] T022 [US2] Add authentication to GET /api/tasks endpoint
- [X] T023 [US2] Ensure query filters tasks by authenticated user_id

## Phase 5: [US3] Task Update
As an authenticated user, I want to update my tasks so that I can modify their details.

### Story Goal
Enable authenticated users to update only their own tasks with proper validation.

### Independent Test Criteria
- Can authenticate and update my own tasks
- Cannot update tasks belonging to other users
- Validation is applied to updated fields
- Updated_at timestamp is properly set

### Implementation Tasks
- [X] T024 [US3] Create TaskUpdate request model in /backend/schemas/task.py
- [X] T025 [US3] Add update_task method to task service in /backend/services/task.py
- [X] T026 [US3] Implement PUT /api/tasks/{id} endpoint in /backend/routes/tasks.py
- [X] T027 [US3] Add authentication and ownership validation to PUT endpoint
- [X] T028 [US3] Validate title length (max 255 chars) in task update

## Phase 6: [US4] Task Deletion
As an authenticated user, I want to delete my tasks so that I can remove items I no longer need.

### Story Goal
Enable authenticated users to delete only their own tasks with proper ownership validation.

### Independent Test Criteria
- Can authenticate and delete my own tasks
- Cannot delete tasks belonging to other users
- Task is properly removed from database

### Implementation Tasks
- [X] T029 [US4] Add delete_task method to task service in /backend/services/task.py
- [X] T030 [US4] Implement DELETE /api/tasks/{id} endpoint in /backend/routes/tasks.py
- [X] T031 [US4] Add authentication and ownership validation to DELETE endpoint

## Phase 7: [US5] Task Completion Toggle
As an authenticated user, I want to toggle the completion status of my tasks so that I can mark them as done or undone.

### Story Goal
Provide a dedicated endpoint to toggle the completion status of tasks with proper ownership validation.

### Independent Test Criteria
- Can authenticate and toggle completion status of my own tasks
- Cannot modify tasks belonging to other users
- Completion status is properly toggled

### Implementation Tasks
- [X] T032 [US5] Create TaskCompleteUpdate request model in /backend/schemas/task.py
- [X] T033 [US5] Add toggle_task_completion method to task service in /backend/services/task.py
- [X] T034 [US5] Implement PATCH /api/tasks/{id}/complete endpoint in /backend/routes/tasks.py
- [X] T035 [US5] Add authentication and ownership validation to PATCH endpoint

## Phase 8: [US6] Error Handling and Validation
As an API consumer, I want standardized error responses so that I can handle failures gracefully.

### Story Goal
Implement consistent error handling and validation across all endpoints.

### Independent Test Criteria
- Invalid requests return 422 Unprocessable Entity with clear error messages
- Unauthorized requests return 401 Unauthorized
- Access to other users' resources returns 403 Forbidden
- Non-existent resources return 404 Not Found

### Implementation Tasks
- [X] T036 [US6] Create custom exceptions in /backend/exceptions/__init__.py
- [X] T037 [US6] Add exception handlers to main application in /backend/main.py
- [X] T038 [US6] Implement request validation for all endpoints
- [X] T039 [US6] Ensure all error responses are JSON formatted
- [X] T040 [US6] Add proper HTTP status codes to all endpoints

## Phase 9: Polish & Cross-Cutting Concerns
Final touches and integration concerns.

- [X] T041 Add API documentation with Swagger/OpenAPI
- [X] T042 Create startup script for the application in /backend/startup.py
- [X] T043 Add database migration setup in /backend/migrations/
- [X] T044 Implement proper logging in /backend/utils/logging.py
- [X] T045 Add health check endpoint in /backend/routes/health.py
- [X] T046 Update README with setup and usage instructions

## Dependencies

### User Story Completion Order
1. US2 (Task Retrieval) depends on US1 (Task Creation) - Need to create tasks before retrieving them
2. US3 (Task Update) depends on US1 (Task Creation) - Need to have tasks to update
3. US4 (Task Deletion) depends on US1 (Task Creation) - Need to have tasks to delete
4. US5 (Task Completion Toggle) depends on US1 (Task Creation) - Need to have tasks to toggle
5. US6 (Error Handling) can be implemented independently but should be tested with all other stories

### Parallel Execution Examples
- T011-T013 (Models and Schemas) can be developed in parallel [P]
- T019, T024, T032 (Request/Response Schemas) can be developed in parallel [P]
- T014, T020, T025, T29, T33 (Service Methods) can be developed in parallel [P]
- T015, T021, T026, T030, T034 (Route Endpoints) can be developed in parallel after services [P]

## Implementation Strategy
1. Start with MVP: Implement US1 (Task Creation) with basic authentication to establish the foundation
2. Incrementally add other user stories with proper testing after each addition
3. Implement error handling (US6) in parallel with other stories to ensure robustness
4. Final polish phase to tie everything together with documentation and monitoring