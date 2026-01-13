---
id: 1
title: todo-backend-spec
stage: plan
date: '2026-01-13'
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-backend-spec
branch: "1-todo-backend-spec"
user: user
command: /sp.plan
labels: ["backend", "plan", "todo", "api"]
links:
  spec: "specs/1-todo-backend-spec/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "specs/1-todo-backend-spec/plan.md"
  - "specs/1-todo-backend-spec/research.md"
  - "specs/1-todo-backend-spec/data-model.md"
  - "specs/1-todo-backend-spec/contracts/api-contract.md"
  - "specs/1-todo-backend-spec/quickstart.md"
tests: []
outcome: "Successfully created comprehensive implementation plan for todo backend API with research, data models, API contracts, and quickstart guide."
evaluation: "Plan addresses all requirements from spec with proper architecture decisions and implementation phases."
---

# Prompt History Record

## Original Prompt

```
@agent-backend-specialist # /sp.plan (Phase II)

## 1. Purpose

This document defines the **authoritative execution plan** for implementing the Hackathon Todo Application – Phase II. It translates `/sp.constitution` and `/sp.specify` documents into a **step‑by‑step, enforceable development sequence**.

All work must follow this order. Skipping or reordering steps is prohibited unless the relevant spec is updated first.

---

## 2. Governing Authority

This plan is governed by:

1. `/sp.constitution`
2. `/sp.specify (frontend)`
3. `/sp.specify (backend)`
4. `/specs/**`

If a conflict exists, higher‑order documents override this plan.

---

## 3. Phase II Execution Overview

Execution is divided into **six mandatory stages**:

1. Repository & Spec Validation
2. Backend Foundation
3. Backend Feature Implementation
4. Frontend Foundation
5. Frontend Feature Implementation
6. Integration, Verification, and Freeze

Each stage must be completed and validated before proceeding.

---

## 4. Stage 1 — Repository & Spec Validation

### 4.1 Monorepo Setup

Confirm repository structure:

```
/specs
/frontend
/backend
/.spec-kit
/CLAUDE.md
/sp.constitution
```

No coding may begin until this structure exists.

---

### 4.2 Spec Completeness Check

Verify the following specs exist and are final:

* `/specs/overview.md`
* `/specs/features/task-crud.md`
* `/specs/features/authentication.md`
* `/specs/api/rest-endpoints.md`
* `/specs/database/schema.md`
* `/specs/ui/components.md`
* `/specs/ui/pages.md`

If any spec is missing or ambiguous, it must be resolved **before implementation**.

---

## 5. Stage 2 — Backend Foundation

### 5.1 Backend Skeleton

* Initialize FastAPI application
* Create required files:

  * `main.py`
  * `db.py`
  * `models.py`
* Configure environment variables:

  * `DATABASE_URL`
  * `BETTER_AUTH_SECRET`

---

### 5.2 Database Setup

* Configure SQLModel engine and session
* Verify Neon PostgreSQL connectivity
* Do not create tables manually outside SQLModel

---

### 5.3 JWT Verification Layer

* Implement global dependency or middleware
* Enforce:

  * Token extraction
  * Signature verification
  * Identity decoding
  * Early rejection on failure (`401`)

No route may be accessible without this layer.

---

## 6. Stage 3 — Backend Feature Implementation

### 6.1 Data Models

* Implement `Task` SQLModel
* Ensure schema matches `/specs/database/schema.md`
* Include `user_id` ownership field

---

### 6.2 API Routes

Implement canonical endpoints:

```
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
PATCH  /api/tasks/{id}/complete
```

Rules:

* JWT authentication required
* `user_id` derived only from JWT
* All queries filtered by authenticated user

---

### 6.3 Error Handling

* Return JSON errors only
* Enforce status codes:

  * `401`, `403`, `404`, `422`

---

## 7. Stage 4 — Frontend Foundation

### 7.1 Frontend Setup

* Initialize Next.js with App Router
* Enable TypeScript
* Configure Tailwind CSS

---

### 7.2 Authentication Integration

* Integrate Better Auth
* Implement login and logout flows
* Store JWT securely on the client

Backend must not participate in auth flows.

---

### 7.3 API Client

* Implement `/frontend/lib/api.ts`
* Automatically attach JWT to all requests
* Centralize error handling

---

## 8. Stage 5 — Frontend Feature Implementation

### 8.1 UI Pages

Implement pages defined in `/specs/ui/pages.md`:

* Login / Signup
* Task List
* Task Create
* Task Edit

---

### 8.2 UI Components

* Build reusable components per `/specs/ui/components.md`
* No direct API calls outside the centralized client

---

### 8.3 Frontend Constraints

* Never send `user_id` to backend
* Never assume authorization on client
* Handle all API errors gracefully

---

## 9. Stage 6 — Integration & Verification

### 9.1 End‑to‑End Validation

Verify:

* JWT required for all API calls
* Cross‑user data access is impossible
* All CRUD operations work as specified

---

### 9.2 Spec Compliance Check

* Confirm code matches all specs
* Confirm no undocumented behavior exists
* If discrepancies are found, update specs **before code**

---

### 9.3 Phase II Freeze

Once validated:

* Specs are frozen
* Code is frozen
* No new features allowed

---

## 10. Completion Criteria

Phase II is complete when:

* All specs are implemented
* All constitution rules are satisfied
* Frontend and backend communicate exclusively via JWT‑secured REST APIs
* No Phase III features exist

---

## 11. Final Authority Clause

This plan is binding for Phase II execution.

Any deviation without a corresponding spec update is invalid.
```

## Response Summary

Successfully created a comprehensive implementation plan for the todo backend API including:
- Technical context with resolved unknowns
- Constitution compliance check
- Research findings document
- Data model specification
- API contracts
- Quickstart guide

The plan addresses all requirements from the original specification with proper architecture decisions and implementation phases. All unknowns have been researched and resolved, enabling the team to proceed with implementation.