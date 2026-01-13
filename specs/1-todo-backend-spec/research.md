# Todo Backend Research Findings

## Decision: Neon PostgreSQL Connection String Format
- **Rationale**: Neon PostgreSQL uses standard PostgreSQL connection string format with additional parameters for connection pooling and branch selection
- **Implementation**: Use format `postgresql://username:password@ep-xxxx.us-east-1.aws.neon.tech/dbname?sslmode=require`
- **Alternatives considered**: Standard PostgreSQL format without Neon-specific parameters (rejected due to SSL requirements)

## Decision: JWT Token Structure from Better Auth
- **Rationale**: Better Auth follows standard JWT structure with user information in the payload
- **Implementation**: Extract user_id from the 'sub' (subject) claim in the JWT payload
- **Alternatives considered**: Custom claims for user identification (rejected as unnecessary complexity)

## Decision: BETTER_AUTH_SECRET Configuration
- **Rationale**: Secure configuration of JWT secret requires environment variable approach
- **Implementation**: Store in .env file and load via python-dotenv, with fallback to system environment
- **Alternatives considered**: Hardcoded secrets (rejected for security reasons), external secret management (overkill for this project)

## Decision: JWT Claim for User Identification
- **Rationale**: Standard JWT 'sub' (subject) claim is the RFC 7519-defined field for the principal (user) that the token refers to
- **Implementation**: Extract user_id from the 'sub' claim in the JWT payload
- **Alternatives considered**: Custom 'user_id' claim (non-standard), 'id' claim (ambiguous)

## Decision: Primary Key Data Type
- **Rationale**: UUID provides better security (harder to guess), distributed generation capability, and avoids enumeration attacks
- **Implementation**: Use UUID for task.id primary key
- **Alternatives considered**: Auto-incrementing integer (predictable, vulnerable to enumeration), string (flexible but potentially inconsistent)

## Decision: Authentication Header Placement
- **Rationale**: Authorization header with Bearer scheme is the standard HTTP authentication pattern, widely supported by HTTP clients and proxies
- **Implementation**: Pass JWT in Authorization header as `Authorization: Bearer <token>`
- **Alternatives considered**: Custom header (non-standard), cookie-based (complex for API), URL parameter (insecure)

## Decision: Title Field Length Limit
- **Rationale**: 255 characters is a common standard that accommodates most practical use cases while preventing extremely long titles that could impact performance
- **Implementation**: Set maximum length of title field to 255 characters
- **Alternatives considered**: 100 characters (more restrictive), 500 characters (more generous), unlimited (potential performance risk)

## Decision: Default Completion Status
- **Rationale**: Defaulting to false matches standard todo application behavior where tasks are typically created as incomplete
- **Implementation**: Set default value of completed field to false
- **Alternatives considered**: Default to true (unusual for todo apps), require explicit status (unnecessary complexity)

## Additional Research Findings

### FastAPI Security Best Practices
- Use Depends() for authentication dependencies
- Implement proper exception handlers for JWT errors
- Validate token expiration and audience claims

### SQLModel Best Practices
- Use TypedDict for response models when returning to API
- Implement proper relationship handling for user-task associations
- Use proper indexing on user_id for performance

### Error Handling Patterns
- Use HTTPException for FastAPI error responses
- Implement consistent error response format
- Handle JWT-specific errors (expired, invalid, missing)