<!-- SYNC IMPACT REPORT:
Version change: N/A (initial creation) → 1.0.0
Modified principles: None (new constitution)
Added sections: All sections per requirements
Removed sections: None
Templates requiring updates: ⚠️ Manual review needed for plan-template.md, spec-template.md, tasks-template.md
Follow-up TODOs: None
-->
# Hackathon Todo Application – Phase II Constitution

## Core Principles

### I. Monorepo Mandate
The project must be implemented as a monorepo. Frontend, backend, and specifications must coexist in a single repository. Claude Code must be able to reason across the entire stack in one context. Required top-level structure: `/specs`, `/frontend`, `/backend`, `.spec-kit`, `/CLAUDE.md`.

### II. Spec-Driven Development (SDD) Authority
Specifications are the source of truth. Code must implement specs, not reinterpret them. Any behavior not covered by a spec must trigger a spec update before implementation. All features must reference the official specs: overview, task-crud, authentication, rest-endpoints, database schema, ui components, and ui pages. No feature may be implemented without a spec.

### III. Authentication Authority - Better Auth Only
Better Auth is the only authentication provider. Authentication occurs exclusively on the frontend. Backend must never authenticate users via sessions or database lookups. All backend authorization relies on JWT tokens issued by Better Auth and attached to every API request as "Authorization: Bearer <token>".

### IV. Stateless Backend Rule
The backend must remain stateless. No server-side sessions. No calls from backend to frontend for auth verification. Every API endpoint must require a valid JWT. Missing or invalid token results in 401 Unauthorized. Authorization must be enforced before any database access.

### V. JWT-Derived Identity & Data Isolation
The authenticated user identity must be extracted exclusively from the JWT. User identity must never be trusted from request body, query parameters, or URL path parameters. Every task must belong to exactly one user. All database queries must include "WHERE tasks.user_id = <authenticated_user_id>". Cross-user access is strictly forbidden.

### VI. API Constitution & REST Compliance
All API routes must be located under `/api/`. Endpoints must remain RESTful and resource-oriented with canonical endpoints: GET/POST/PUT/DELETE/PATCH for tasks. All API endpoints require JWT authentication. There are no public task endpoints. API behavior must exactly match the official spec.

## Additional Constraints

### Technology Stack Requirements
Backend must use FastAPI, SQLModel, and Pydantic schemas. Frontend must use NextJS App Router, TypeScript, and Tailwind CSS. Database connection must be configured via DATABASE_URL. SQLModel is mandatory for all database access. Direct SQL queries are prohibited unless explicitly specified.

### Authentication & Security Requirements
JWT verification middleware must extract JWT from headers, verify signature, decode user identity, and reject unauthorized requests early. Environment variable BETTER_AUTH_SECRET required in both frontend and backend. Centralized API client at `/frontend/lib/api.ts` must automatically attach JWT to every request.

### Database Schema Requirements
Database schema is defined exclusively in `/specs/database/schema.md`. Each task must include: id (primary key), user_id (foreign key), title (required), description (optional), completed (boolean), created_at, updated_at. Any schema change requires a spec update.

## Development Workflow

### Implementation Standards
Every task must reference the specification. Code changes must not deviate from spec without prior spec update. All database queries must enforce user ownership. Frontend handles login/logout/token storage. Backend must never render UI or handle login flows. Error responses must be JSON format with appropriate HTTP status codes (401, 403, 404, 422).

### Phase II Limitations
Phase II must not include chatbot functionality, AI features, or MCP tools. These are reserved for Phase III. All implementation must comply with written specs and this constitution, which always win over code, prompts, informal instructions, or other specs.

## Governance

This constitution and written specs always override code, prompts, informal instructions, or other specifications. All implementation violating this document is invalid regardless of functionality. Amendments require explicit documentation and approval process. All pull requests and reviews must verify compliance with these principles. Deviations must be resolved via spec updates.

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13