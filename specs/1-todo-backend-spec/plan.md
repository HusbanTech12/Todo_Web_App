# Todo Backend API Implementation Plan

## Technical Context

### System Architecture
- **Backend Framework**: FastAPI
- **ORM**: SQLModel
- **Database**: Neon PostgreSQL
- **Authentication**: JWT tokens via Better Auth
- **Environment**: Python 3.x

### Component Interactions
- Main application entry point: `/backend/main.py`
- Database connection: `/backend/db.py`
- Data models: `/backend/models.py`
- API routes: `/backend/routes/tasks.py`
- Authentication middleware: JWT verification layer

### Knowns
- Database connection string format for Neon PostgreSQL: Standard PostgreSQL format with SSL requirements
- JWT token structure from Better Auth: Standard JWT with user_id in 'sub' claim
- BETTER_AUTH_SECRET configuration method: Environment variable approach
- JWT claim for user identification: 'sub' (subject) claim
- Primary key data type: UUID for task.id
- Authentication header: Authorization header with Bearer scheme
- Title field length: Maximum 255 characters
- Default completion status: false (incomplete)

### Dependencies
- FastAPI: Web framework
- SQLModel: ORM layer
- Pydantic: Data validation
- python-jose: JWT handling
- uvicorn: ASGI server

## Constitution Check

### Compliance Status
- [x] All database access uses SQLModel ORM (no direct SQL)
- [x] JWT authentication required for all API endpoints
- [x] User isolation enforced at database query level
- [x] Pydantic models for request/response validation
- [x] Proper error handling with JSON responses
- [x] Cross-user access prevention implemented
- [x] Neon PostgreSQL database used as mandated
- [ ] Environment variables properly configured (TBD)
- [ ] BETTER_AUTH_SECRET securely managed (TBD)

### Gate Status
- [x] All unknowns from Technical Context resolved
- [ ] Database connectivity verified (BLOCKED)
- [ ] JWT authentication integration tested (BLOCKED)

## Phase 0: Research & Resolution

### Research Tasks

#### RT-1: Neon PostgreSQL Connection
- Investigate proper connection string format for Neon
- Research SSL configuration requirements
- Determine best practices for connection pooling

#### RT-2: Better Auth JWT Integration
- Research JWT token structure from Better Auth
- Understand how to extract user_id from 'sub' claim
- Determine token validation requirements

#### RT-3: Environment Configuration
- Research proper way to configure BETTER_AUTH_SECRET
- Determine secure storage patterns for environment variables
- Verify configuration approach for production deployment

## Phase 1: Data Model & API Contracts

### DM-1: Task Entity Design
- Primary key: id (UUID)
- Foreign key: user_id (from JWT 'sub' claim)
- Required field: title (string, max 255 chars)
- Optional field: description (text)
- Boolean field: completed (default false)
- Timestamps: created_at, updated_at

### DM-2: Request/Response Models
- TaskCreate: title (required, max 255 chars), description (optional)
- TaskUpdate: title (optional, max 255 chars), description (optional), completed (optional)
- TaskResponse: all fields including id and timestamps
- TaskListResponse: array of TaskResponse

### AC-1: API Endpoint Contracts
- GET /api/tasks: Retrieve authenticated user's tasks
- POST /api/tasks: Create new task for authenticated user (title max 255 chars, completed default false)
- GET /api/tasks/{id}: Retrieve specific task (user-owned)
- PUT /api/tasks/{id}: Update specific task (user-owned)
- DELETE /api/tasks/{id}: Delete specific task (user-owned)
- PATCH /api/tasks/{id}/complete: Toggle completion status

## Phase 2: Implementation Tasks

### Task 2.1: Backend Foundation Setup
- [ ] Create /backend directory structure
- [ ] Initialize FastAPI application in main.py
- [ ] Set up database connection in db.py
- [ ] Configure environment variables

### Task 2.2: Authentication Layer
- [ ] Implement JWT verification dependency
- [ ] Extract user_id from JWT 'sub' claim
- [ ] Create authentication middleware

### Task 2.3: Data Models
- [ ] Define Task SQLModel with proper relationships
- [ ] Implement validation rules (title max 255 chars)
- [ ] Set up proper indexing on user_id

### Task 2.4: API Routes
- [ ] Implement all canonical endpoints
- [ ] Apply authentication to all routes
- [ ] Ensure user isolation in queries
- [ ] Add proper error handling
- [ ] Validate title length (max 255 chars)
- [ ] Set default completion status to false

### Task 2.5: Testing & Validation
- [ ] Unit tests for all endpoints
- [ ] Integration tests for authentication
- [ ] User isolation validation tests
- [ ] Error condition testing
- [ ] Title length validation testing