# Todo Backend Quickstart Guide

## Prerequisites

- Python 3.12+
- PostgreSQL database (Neon recommended)
- Better Auth frontend for JWT generation

## Setup

### 1. Clone and Navigate
```bash
cd /path/to/project
cd backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install fastapi uvicorn sqlmodel psycopg2-binary python-jose[email] python-dotenv
```

### 4. Environment Configuration
Create a `.env` file with the following variables:
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
BETTER_AUTH_SECRET=your_better_auth_secret_key
```

### 5. Database Setup
Run database migrations or initialize tables:
```bash
# This will depend on your specific migration setup
```

## Running the Server

### Development
```bash
uvicorn main:app --reload --port 8000
```

### Production
```bash
uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000
```

## API Usage

### Authentication
All API calls require a JWT token obtained from the Better Auth frontend:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8000/api/user123/tasks
```

### Example Requests

#### Get User's Tasks
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:8000/api/user123/tasks?status=pending&sort=created"
```

#### Create New Task
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"New task","description":"Task description"}' \
  http://localhost:8000/api/user123/tasks
```

#### Update Task
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Updated title","completed":true}' \
  http://localhost:8000/api/user123/tasks/1
```

#### Toggle Task Completion
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8000/api/user123/tasks/1/complete
```

#### Delete Task
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8000/api/user123/tasks/1
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for verifying JWT tokens from Better Auth
- `ENVIRONMENT`: (optional) Set to "production" for production settings

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify DATABASE_URL is correctly formatted
   - Check that PostgreSQL server is running
   - Ensure credentials are correct

2. **JWT Authentication Failures**:
   - Confirm BETTER_AUTH_SECRET matches the one used by Better Auth
   - Verify JWT token format (Bearer <token>)
   - Check token expiration

3. **Port Already in Use**:
   ```bash
   # Find processes using port 8000
   lsof -i :8000
   # Kill the process if needed
   kill -9 <process_id>
   ```

## Next Steps

1. Review the API documentation at `http://localhost:8000/docs` (Swagger UI)
2. Implement the frontend integration with Better Auth
3. Add additional endpoints as needed
4. Set up monitoring and logging