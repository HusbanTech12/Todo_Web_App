# Data Model for Todo Backend

## Entities

### Task Entity
**Fields**:
- id: Integer (Primary Key, Auto-generated)
- user_id: String (Foreign Key to User, Required)
- title: String (Required, Not Null)
- description: Text (Optional, Nullable)
- completed: Boolean (Default: false)
- created_at: DateTime (Auto-generated on creation)
- updated_at: DateTime (Auto-generated on update)

**Relationships**:
- Belongs to one User (via user_id foreign key)
- User can have many Tasks

**Indexes**:
- Index on user_id (for efficient user-based queries)
- Index on completed (for efficient status-based queries)

**Validation Rules**:
- title must not be empty
- user_id must exist in users table
- created_at and updated_at are automatically managed

### User Entity (Managed by Better Auth)
**Fields**:
- id: String (Primary Key, from Better Auth)
- email: String (Unique, from Better Auth)
- name: String (from Better Auth)
- created_at: DateTime (from Better Auth)

**Relationships**:
- Has many Tasks (via tasks.user_id foreign key)

**State Transitions**:
- Task can transition from completed=false to completed=true and vice versa
- updated_at field automatically updates on any change

## Constraints

### Data Integrity
- Foreign key constraint: tasks.user_id must reference valid users.id
- Not null constraints on required fields
- Unique constraint on user emails (managed by Better Auth)

### Access Control
- Tasks can only be accessed by the owning user
- Cross-user access is prevented at the API level

## Schema Evolution Considerations

### Future Extensions
- Additional task properties (priority, due_date, category)
- Soft delete capability (deleted_at field)
- Task sharing between users (would require permissions table)