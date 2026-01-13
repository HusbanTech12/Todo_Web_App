# Todo API Contract

## Base URL
`/api`

## Authentication
All endpoints require JWT authentication via Authorization header with Bearer scheme:
```
Authorization: Bearer <jwt_token>
```

The user identity is extracted from the 'sub' claim in the JWT token.

## Common Error Responses
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: User attempting to access another user's resource
- `404 Not Found`: Requested resource does not exist
- `422 Unprocessable Entity`: Invalid request data

## Endpoints

### GET /tasks
Retrieve all tasks for the authenticated user.

#### Headers
- Authorization: Bearer <jwt_token>

#### Query Parameters
- None

#### Response
- `200 OK`
```json
{
  "tasks": [
    {
      "id": "uuid-string",
      "user_id": "uuid-string",
      "title": "Task title",
      "description": "Optional task description",
      "completed": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ]
}
```

### POST /tasks
Create a new task for the authenticated user. Title must not exceed 255 characters. New tasks have completed status set to false by default.

#### Headers
- Authorization: Bearer <jwt_token>

#### Request Body
```json
{
  "title": "Task title (max 255 characters)",
  "description": "Optional task description"
}
```

#### Response
- `201 Created`
```json
{
  "id": "uuid-string",
  "user_id": "uuid-string from JWT 'sub' claim",
  "title": "Task title",
  "description": "Optional task description",
  "completed": false,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

### GET /tasks/{id}
Retrieve a specific task for the authenticated user.

#### Path Parameters
- id: Task ID (UUID string)

#### Headers
- Authorization: Bearer <jwt_token>

#### Response
- `200 OK`
```json
{
  "id": "uuid-string",
  "user_id": "uuid-string",
  "title": "Task title",
  "description": "Optional task description",
  "completed": false,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

### PUT /tasks/{id}
Update a specific task for the authenticated user. Title must not exceed 255 characters.

#### Path Parameters
- id: Task ID (UUID string)

#### Headers
- Authorization: Bearer <jwt_token>

#### Request Body
```json
{
  "title": "Updated task title (max 255 characters)",
  "description": "Updated task description",
  "completed": true
}
```

#### Response
- `200 OK`
```json
{
  "id": "uuid-string",
  "user_id": "uuid-string from JWT 'sub' claim",
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": true,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-02T00:00:00Z"
}
```

### DELETE /tasks/{id}
Delete a specific task for the authenticated user.

#### Path Parameters
- id: Task ID (UUID string)

#### Headers
- Authorization: Bearer <jwt_token>

#### Response
- `204 No Content`

### PATCH /tasks/{id}/complete
Toggle the completion status of a specific task.

#### Path Parameters
- id: Task ID (UUID string)

#### Headers
- Authorization: Bearer <jwt_token>

#### Request Body
```json
{
  "completed": true
}
```

#### Response
- `200 OK`
```json
{
  "id": "uuid-string",
  "user_id": "uuid-string from JWT 'sub' claim",
  "title": "Task title",
  "description": "Optional task description",
  "completed": true,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-02T00:00:00Z"
}
```