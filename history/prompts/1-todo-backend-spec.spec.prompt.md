---
id: 1
title: todo-backend-spec
stage: spec
date: '2026-01-13'
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-backend-spec
branch: "1-todo-backend-spec"
user: user
command: /sp.specify
labels: ["backend", "specification", "todo", "api"]
links:
  spec: "specs/1-todo-backend-spec/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "specs/1-todo-backend-spec/spec.md"
  - "specs/1-todo-backend-spec/checklists/requirements.md"
tests: []
outcome: "Successfully created backend specification for todo application with JWT authentication, task CRUD operations, and user isolation requirements."
evaluation: "Specification meets all quality criteria with clear functional requirements, success metrics, and user scenarios."
---

# Prompt History Record

## Original Prompt

```
@agent-backend-specialist # /sp.specify (Backend)

## 1. Purpose

This document specifies **all authorized backend behavior, structure, and constraints** for the Hackathon Todo Application – Phase II. It derives **direct authority from `/sp.constitution`** and applies **only to the `/backend` directory**.

No backend code may exist that is not justified by this specification and the referenced specs.

---

## 2. Governing Authority

This specification is governed by, and subordinate to:

1. `/sp.constitution`
2. `/specs/**` specifications

If any conflict exists, `/sp.constitution` takes precedence.

---

## 3. Backend Scope (Phase II)

The backend is responsible **only** for:

* JWT verification and authorization
* Enforcing user identity and data isolation
* Task CRUD business logic
* Persistent data access via SQLModel
* REST API exposure

The backend is explicitly **not responsible** for:

* User authentication flows (login/signup UI)
* Session management
* UI rendering
* Client-side state handling

---

## 4. Technology Mandate

The backend **must** use the following stack:

* Python 3.x
* FastAPI
* SQLModel
* Pydantic
* Neon Serverless PostgreSQL

No alternative frameworks, ORMs, or databases are permitted.

---

## 5. Directory Structure Law

The `/backend` directory must follow this structure:

```
/backend
  main.py
  db.py
  models.py
  /route resource-oriented

Canonical endpoints:

```
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
PATCH  /api/tasks/{id}/complete
```

---

### 8.2 Authorization Enforcement

* All routes require JWT authentication
* Authenticated user identity must be injected via dependency
* All database queries **must** be filtered by authenticated `user_id`

---

## 9. Database Access Specification

### 9.1 ORM Enforcement

* SQLModel is mandatory for all database access
* Direct SQL queries are prohibited unless explicitly specified in a spec

---

### 9.2 Task Model Requirements

The `Task` model must align exactly with `/specs/database/schema.md`:

* `id` (primary key)
* `user_id` (foreign key)
* `title` (required)
* `description` (optional)
* `completed` (boolean)
* `created_at`
* `updated_at`

---

### 9.3 Ownership Enforcement

All task queries must include:

```sql
WHERE tasks.user_id = <authenticated_user_id>
```

Cross-user access is strictly forbidden.

---

## 10. Request & Response Models

* Pydantic models must be used for:

  * Request validation
  * Response serialization
* Internal SQLModel objects must not be returned directly

---

## 11. Error Handling Rules

* Errors must be returned as JSON
* Authentication failure → `401 Unauthorized`
* Authorization failure → `403 Forbidden`
* Missing resources → `404 Not Found`
* Validation errors → `422 Unprocessable Entity`

---

## 12. Security Constraints

The backend must:

* Reject any request lacking a valid JWT
* Never trust client-supplied user identifiers
* Enforce user isolation at the database query level
* Fail closed on auth or validation errors

---

## 13. Phase II Enforcement

The backend **must not include**:

* Chatbot or AI logic
* MCP tooling
* Background jobs unrelated to task CRUD

---

## 14. Compliance Declaration

Any backend code that:

* Violates `/sp.constitution`
* Bypasses this specification
* Introduces unauthorized behavior

Is considered **invalid** and must be removed.

---

## 15. Final Authority Clause

This specification is binding for all backend development in Phase II.

Compliance is mandatory and non-negotiable.
```

## Response Summary

Successfully created a comprehensive backend specification for the todo application that includes:
- JWT authentication and authorization requirements
- Task CRUD operations with proper user isolation
- Error handling standards
- Data validation requirements
- Success criteria and user scenarios
- Functional requirements aligned with the original specification

The specification follows all mandated requirements including SQLModel usage, user data isolation, and proper error handling.