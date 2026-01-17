# Todo Backend API Specification

## Feature Overview

Backend specifications for Hackathon II Todo App. Implements REST API, JWT authentication, task CRUD operations, and uses FastAPI, SQLModel, and Neon PostgreSQL.

## User Scenarios & Testing

### Primary User Flows

1. **Authenticated User Task Management**
   - User authenticates via frontend Better Auth system
   - User retrieves their JWT token
   - User makes API requests with JWT in Authorization header
   - User can create, read, update, and delete their own tasks
   - User can filter and sort their tasks

2. **Task Operations**
   - User creates a new task with title and optional description
   - User views their list of tasks with filtering options
   - User updates task details or toggles completion status
   - User deletes unwanted tasks

### Test Scenarios

- User can successfully authenticate and receive JWT token from frontend
- User can access their own tasks via API endpoints
- User cannot access other users' tasks
- User can perform CRUD operations on their own tasks
- Filtering and sorting of tasks works as expected
- API returns appropriate error responses for invalid requests

## Functional Requirements

### FR-1: API Authentication
- **Requirement**: The API must verify JWT tokens for all endpoints
- **Acceptance Criteria**:
  - All API endpoints require a valid JWT token in Authorization header
  - Invalid or missing tokens return 401 Unauthorized
  - Tokens are validated using the BETTER_AUTH_SECRET
  - User identity is extracted from JWT payload

### FR-2: Task CRUD Operations
- **Requirement**: Users must be able to perform CRUD operations on tasks
- **Acceptance Criteria**:
  - Create: POST to /{user_id}/tasks creates a new task with title (required) and optional description
  - Read: GET to /{user_id}/tasks returns all tasks for the specified user
  - Update: PUT to /{user_id}/tasks/{id} updates task properties
  - Delete: DELETE to /{user_id}/tasks/{id} removes the task
  - Complete: PATCH to /{user_id}/tasks/{id}/complete toggles completion status

### FR-3: Task Ownership Enforcement
- **Requirement**: Users can only access their own tasks
- **Acceptance Criteria**:
  - API validates that the user_id in the JWT matches the requested user_id in the URL
  - Requests for other users' tasks return 403 Forbidden
  - Task creation assigns the user_id from the JWT

### FR-4: Task Filtering and Sorting
- **Requirement**: API must support filtering and sorting of tasks
- **Acceptance Criteria**:
  - GET /{user_id}/tasks supports status query parameter (all|pending|completed)
  - GET /{user_id}/tasks supports sort query parameter (created|title|due_date)
  - Results are filtered and sorted according to parameters

### FR-5: Data Validation
- **Requirement**: API must validate incoming data
- **Acceptance Criteria**:
  - Task title is required and must be a non-empty string
  - Task description is optional and can be text up to maximum length
  - Invalid data returns appropriate error messages with 400 Bad Request

### FR-6: Error Handling
- **Requirement**: API must provide meaningful error responses
- **Acceptance Criteria**:
  - All error responses are in JSON format
  - Proper HTTP status codes are returned (401, 403, 404, 400, 500)
  - Error messages are descriptive but don't expose sensitive information

## Non-Functional Requirements

### NFR-1: Performance
- API response times should be under 1 second for typical operations
- System should support at least 100 concurrent users

### NFR-2: Security
- All communication must be over HTTPS
- JWT tokens must be validated securely
- No sensitive information exposed in error messages

### NFR-3: Availability
- API should be available 99% of the time
- Graceful degradation when database is unavailable

## Success Criteria

- Users can perform all CRUD operations on their tasks with response times under 1 second
- 99% of API requests return successful responses (2xx or 4xx, not 5xx)
- Users can only access their own tasks, preventing unauthorized data access
- Authentication system properly validates JWT tokens issued by Better Auth
- Task filtering and sorting features work as specified

## Key Entities

### Task Entity
- id: Unique identifier for the task
- user_id: Identifier linking task to owner
- title: Task title (required)
- description: Task details (optional)
- completed: Boolean indicating completion status
- created_at: Timestamp when task was created
- updated_at: Timestamp when task was last modified

### User Entity
- id: User identifier from Better Auth system
- Associated with multiple tasks through user_id foreign key

## Assumptions

- Better Auth system handles user registration and login
- JWT tokens are properly signed and contain user_id claim
- Neon PostgreSQL database is accessible and configured
- Frontend application manages JWT storage and transmission
- Users understand their own user_id or it's retrieved from JWT claims

## Dependencies

- Better Auth system for user authentication and JWT issuance
- Neon PostgreSQL database for data persistence
- Frontend application to provide JWT tokens with API requests