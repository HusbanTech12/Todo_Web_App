# Frontend-Backend API Contract

## Authentication Endpoints

### POST /api/auth/register
- **Description**: Register a new user account
- **Headers**:
  - Content-Type: application/json
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  - 200: Success with authentication token
  - 400: Invalid input
  - 409: User already exists

### POST /api/auth/login
- **Description**: Authenticate user and return token
- **Headers**:
  - Content-Type: application/json
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  - 200: Success with authentication token
  - 401: Invalid credentials

### POST /api/auth/logout
- **Description**: Log out the current user
- **Headers**:
  - Authorization: Bearer {token}
- **Response**:
  - 200: Success

## Todo Endpoints

### GET /api/todos
- **Description**: Retrieve all todos for the authenticated user
- **Headers**:
  - Authorization: Bearer {token}
- **Response**:
  - 200: Array of todo items
  - 401: Unauthorized

### POST /api/todos
- **Description**: Create a new todo item
- **Headers**:
  - Authorization: Bearer {token}
  - Content-Type: application/json
- **Request Body**:
  ```json
  {
    "title": "New Todo",
    "description": "Todo description",
    "completed": false
  }
  ```
- **Response**:
  - 201: Created todo item
  - 400: Invalid input
  - 401: Unauthorized

### PUT /api/todos/{id}
- **Description**: Update an existing todo item
- **Headers**:
  - Authorization: Bearer {token}
  - Content-Type: application/json
- **Request Body**:
  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Response**:
  - 200: Updated todo item
  - 400: Invalid input
  - 401: Unauthorized
  - 404: Todo not found

### DELETE /api/todos/{id}
- **Description**: Delete a todo item
- **Headers**:
  - Authorization: Bearer {token}
- **Response**:
  - 204: Success
  - 401: Unauthorized
  - 404: Todo not found

## Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error message"
}
```

## Success Response Format

Success responses follow this format:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```