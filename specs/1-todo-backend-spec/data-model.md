# Todo Backend Data Model

## Task Entity

### Fields
- **id** (UUID, Primary Key)
  - Type: UUID
  - Required: Yes
  - Unique: Yes
  - Description: Unique identifier for the task

- **user_id** (Foreign Key)
  - Type: UUID or Integer
  - Required: Yes
  - Index: Yes (for performance)
  - Description: Links task to the owning user
  - Relationship: References user identifier from JWT 'sub' claim

- **title** (String)
  - Type: String (max 255 characters)
  - Required: Yes
  - Validation: Min length 1 character, max length 255 characters
  - Description: Brief description of the task

- **description** (Text)
  - Type: Text (optional, nullable)
  - Required: No
  - Description: Detailed information about the task

- **completed** (Boolean)
  - Type: Boolean
  - Required: No
  - Default: False
  - Description: Completion status of the task

- **created_at** (Timestamp)
  - Type: DateTime
  - Required: Yes
  - Default: Current timestamp
  - Description: When the task was created

- **updated_at** (Timestamp)
  - Type: DateTime
  - Required: Yes
  - Default: Current timestamp, auto-update
  - Description: When the task was last modified

### Relationships
- Task belongs to a User (identified by user_id from JWT 'sub' claim)

### Validation Rules
- Title must not be empty
- Title must not exceed 255 characters
- user_id must match authenticated user from JWT 'sub' claim
- Prevent modification/deletion of tasks owned by other users

### State Transitions
- New task: completed = false (default)
- Task completion: completed = true
- Task reopening: completed = false