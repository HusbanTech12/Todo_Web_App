# Frontend Data Model

## Entities

### User
- **Fields**:
  - id: string (unique identifier)
  - email: string (email address for login)
  - createdAt: Date (account creation timestamp)
  - updatedAt: Date (last update timestamp)
- **Validation**: Email must be valid format, required fields cannot be empty
- **Relationships**: Owns multiple Todo items

### Todo Item
- **Fields**:
  - id: string (unique identifier)
  - userId: string (owner of the todo)
  - title: string (todo title)
  - description: string | null (optional description)
  - completed: boolean (completion status)
  - createdAt: Date (creation timestamp)
  - updatedAt: Date (last update timestamp)
- **Validation**: Title is required, userId must reference valid user
- **Relationships**: Belongs to one User

### Authentication Session
- **Fields**:
  - token: string (JWT token)
  - refreshToken: string (refresh token if applicable)
  - expiresAt: Date (expiration timestamp)
  - userId: string (associated user)
- **Validation**: Token must be valid JWT format, expiration must be in the future
- **State Transitions**: Active → Expired (when token expires)

## Frontend-Specific Models

### Form State
- **LoginCredentials**:
  - email: string
  - password: string
- **RegisterCredentials**:
  - email: string
  - password: string
  - confirmPassword: string

### UI State
- **TodoFilter**:
  - status: 'all' | 'active' | 'completed'
  - sortBy: 'created' | 'updated' | 'title'

### API Response Models
- **ApiResponse<T>**:
  - success: boolean
  - data?: T
  - error?: string
  - message?: string