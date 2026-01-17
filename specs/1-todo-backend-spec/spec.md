# Todo Backend API Specification

## 1. Feature Overview

This specification defines the backend API for the Hackathon Todo Application – Phase II. The backend provides JWT verification, authorization, task CRUD operations, and persistent data access using SQLModel with Neon PostgreSQL.

## Clarifications

### Session 2026-01-13

- Q: Which JWT claim contains the user identifier? → A: sub (subject) claim
- Q: What data type should be used for the task.id primary key? → A: UUID
- Q: Where should the authentication token be placed in requests? → A: Authorization header with Bearer scheme
- Q: What should be the maximum length for the task title field? → A: 255 characters
- Q: What should be the default completion status for new tasks? → A: false (incomplete)

## 2. User Scenarios & Testing

### Primary User Scenario
As an authenticated user, I want to manage my personal tasks through a secure API so that I can create, read, update, and delete my tasks while ensuring my data remains isolated from other users.

### Secondary Scenarios
- As an API consumer, I want standardized error responses so that I can handle failures gracefully
- As a developer, I want consistent data validation so that invalid data doesn't corrupt the system
- As a security auditor, I want user data isolation enforced at the API level so that users cannot access each other's data

### Testing Approach
- Manual testing of all CRUD operations with authenticated users
- Automated tests verifying user data isolation
- Authentication failure scenario testing
- Input validation boundary testing

## 3. Functional Requirements

### FR-1: JWT Authentication
The system shall verify JWT tokens passed in the Authorization header with Bearer scheme for all API requests and reject requests without valid tokens with a 401 Unauthorized response.

### FR-2: User Identity Injection
The system shall extract and inject authenticated user identity into request context for use by business logic.

### FR-3: Task Creation
The system shall allow authenticated users to create new tasks with title (required, max 255 characters), description (optional), and completed status (defaults to false).

### FR-4: Task Retrieval
The system shall allow authenticated users to retrieve their own tasks only, filtering results by authenticated user_id.

### FR-5: Task Update
The system shall allow authenticated users to update their own tasks, ensuring user ownership before modification.

### FR-6: Task Deletion
The system shall allow authenticated users to delete their own tasks, ensuring user ownership before deletion.

### FR-7: Task Completion Toggle
The system shall provide a PATCH endpoint to toggle the completion status of individual tasks.

### FR-8: Cross-User Access Prevention
The system shall prevent users from accessing, modifying, or deleting tasks belonging to other users.

### FR-9: Request Validation
The system shall validate all incoming requests using Pydantic models and return 422 Unprocessable Entity for invalid data.

### FR-10: Error Handling
The system shall return JSON-formatted error responses with appropriate HTTP status codes.

## 4. Success Criteria

- 100% of authenticated requests successfully retrieve user's own tasks while preventing access to others' tasks
- Task CRUD operations complete within 500ms under normal load conditions
- 99.9% uptime for authenticated API endpoints during business hours
- Zero successful cross-user data access attempts in security testing
- 100% of invalid requests are rejected with appropriate error responses

## 5. Key Entities

### Task Entity
- id: Unique identifier (UUID primary key)
- user_id: Foreign key linking to authenticated user
- title: Required string representing task name (max 255 characters)
- description: Optional string with task details
- completed: Boolean indicating completion status (default: false)
- created_at: Timestamp of creation
- updated_at: Timestamp of last modification

### User Identity
- user_id: Unique identifier extracted from JWT 'sub' (subject) claim
- authentication_status: Valid/Invalid token status

## 6. Constraints & Assumptions

### Constraints
- All database access must use SQLModel ORM
- All API endpoints require JWT authentication
- All queries must filter by authenticated user_id
- Direct SQL queries are prohibited except where explicitly specified
- No alternative frameworks, ORMs, or databases permitted

### Assumptions
- Better Auth provides JWT tokens with user_id claim
- Neon PostgreSQL serverless provides reliable database connectivity
- FastAPI handles request routing and dependency injection
- Pydantic validates request/response models effectively
- BETTER_AUTH_SECRET environment variable contains the JWT signing secret

## 7. Dependencies

- Better Auth service for JWT generation and validation
- Neon PostgreSQL database service
- Python 3.x runtime environment
- FastAPI framework
- SQLModel ORM
- Pydantic validation library