# API Contract for Todo Backend

## Base URL
`/api`

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Endpoints

### GET /{user_id}/tasks
**Description**: Retrieve all tasks for a specific user

**Parameters**:
- `user_id` (path): User identifier from JWT token
- `status` (query, optional): Filter by completion status [all|pending|completed]
- `sort` (query, optional): Sort by [created|title|due_date]

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": "user123",
      "title": "Sample task",
      "description": "Task description",
      "completed": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ]
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to access another user's tasks

---

### POST /{user_id}/tasks
**Description**: Create a new task for a user

**Parameters**:
- `user_id` (path): User identifier from JWT token

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Request Body**:
```json
{
  "title": "Task title",
  "description": "Optional description"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": "user123",
    "title": "Task title",
    "description": "Optional description",
    "completed": false,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Missing required fields or validation errors
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to create task for another user

---

### GET /{user_id}/tasks/{id}
**Description**: Retrieve a specific task

**Parameters**:
- `user_id` (path): User identifier from JWT token
- `id` (path): Task identifier

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": "user123",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to access another user's task
- `404 Not Found`: Task with specified ID does not exist

---

### PUT /{user_id}/tasks/{id}
**Description**: Update a specific task

**Parameters**:
- `user_id` (path): User identifier from JWT token
- `id` (path): Task identifier

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Request Body**:
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": "user123",
    "title": "Updated task title",
    "description": "Updated description",
    "completed": true,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors in request body
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to update another user's task
- `404 Not Found`: Task with specified ID does not exist

---

### DELETE /{user_id}/tasks/{id}
**Description**: Delete a specific task

**Parameters**:
- `user_id` (path): User identifier from JWT token
- `id` (path): Task identifier

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (204)**:
```
Status: 204 No Content
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to delete another user's task
- `404 Not Found`: Task with specified ID does not exist

---

### PATCH /{user_id}/tasks/{id}/complete
**Description**: Toggle completion status of a task

**Parameters**:
- `user_id` (path): User identifier from JWT token
- `id` (path): Task identifier

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": "user123",
    "title": "Task title",
    "description": "Task description",
    "completed": true,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to modify another user's task
- `404 Not Found`: Task with specified ID does not exist

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_001 | 401 | Missing or invalid authorization token |
| AUTH_002 | 403 | Insufficient permissions to access resource |
| VALIDATION_001 | 400 | Request validation failed |
| RESOURCE_001 | 404 | Resource not found |
| SERVER_001 | 500 | Internal server error |