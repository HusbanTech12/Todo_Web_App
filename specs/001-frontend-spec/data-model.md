# Data Model: Frontend for Todo App Phase II

## Entity: User
- **Description**: Represents an authenticated user of the todo application, identified by JWT token from Better Auth
- **Fields**:
  - id: Unique identifier from Better Auth system
  - email: User's email address for identification
  - name: User's display name
- **Relationships**: Owns multiple Tasks

## Entity: Task
- **Description**: Represents a user's task with title, description, and completion status, owned by a specific user
- **Fields**:
  - id: Primary key, unique identifier for the task
  - user_id: Foreign key linking to the owning user
  - title: Required string, the task title
  - description: Optional string, detailed description of the task
  - completed: Boolean indicating completion status
  - created_at: Timestamp of when the task was created
  - updated_at: Timestamp of when the task was last updated
- **Validation Rules**:
  - Title is required and must be between 1-255 characters
  - Description is optional, max 1000 characters
  - Completed defaults to false
- **State Transitions**:
  - New task: completed = false
  - Task completed: completed = true
  - Task reopened: completed = false

## Relationships
- **User to Task**: One-to-many relationship (one user owns many tasks)
- **Access Control**: All task operations must be filtered by authenticated user_id to ensure data isolation