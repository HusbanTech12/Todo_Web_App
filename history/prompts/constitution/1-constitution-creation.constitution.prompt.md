---
id: 1
title: constitution-creation
stage: constitution
date: 2026-01-13
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: claude
command: /sp.constitution
labels: [constitution, spec-driven-development, hackathon]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```
# /sp.constitution

## 1. Purpose

This constitution defines the **non‑negotiable rules, principles, and constraints** governing the development of the Hackathon Todo Application – Phase II. All implementation decisions **must conform** to this document. In the event of conflict, this constitution overrides code, prompts, and informal instructions.

---

## 2. Scope

This constitution applies to:

* Phase II: Full‑Stack Web Application
* Frontend (Next.js)
* Backend (FastAPI)
* Database (Neon PostgreSQL)
* Authentication (Better Auth + JWT)
* Spec‑Driven Development using Spec‑Kit and Claude Code

---

## 3. Architectural Principles

### 3.1 Monorepo Mandate

* The project **must be implemented as a monorepo**.
* Frontend, backend, and specifications must coexist in a single repository.
* Claude Code must be able to reason across the entire stack in one context.

Required top‑level structure:

```
/specs
/frontend
/backend
/.spec-kit
/CLAUDE.md
```

---

### 3.2 Spec‑Driven Development (SDD)

* **Specifications are the source of truth**.
* Code must implement specs, not reinterpret them.
* Any behavior not covered by a spec must trigger a spec update before implementation.

All features must reference:

* /specs/overview.md

* /specs/features/task-crud.md

* /specs/features/authentication.md

* /specs/api/rest-endpoints.md

* /specs/database/schema.md

* /specs/ui/components.md

* /specs/ui/pages.md

Rules enforced:

* No feature was implemented without a spec

* Specs were the single source of truth

* All deviations were resolved via spec updates

* Spec compliance is complete and frozen.

---

## 4. Authentication & Security Law

### 4.1 Authentication Authority

* **Better Auth is the only authentication provider**.
* Authentication occurs exclusively on the frontend.
* Backend **must never** authenticate users via sessions or database lookups.

---

### 4.2 JWT as the Sole Credential

* All backend authorization relies on **JWT tokens**.
* JWTs must:

  * Be issued by Better Auth
  * Be attached to every API request as:

    ```
    Authorization: Bearer <token>
    ```
  * Be verified by FastAPI using a shared secret

Environment variable required in **both frontend and backend**:

```
BETTER_AUTH_SECRET
```

---

### 4.3 Stateless Backend Rule

* The backend **must remain stateless**.
* No server‑side sessions.
* No calls from backend to frontend for auth verification.

---

### 4.4 Mandatory Authorization Enforcement

* Every API endpoint **must require a valid JWT**.
* Missing or invalid token → `401 Unauthorized`.
* Authorization must be enforced **before any database access**.

---

## 5. User Identity & Data Isolation

### 5.1 JWT‑Derived Identity Rule

* The authenticated user identity **must be extracted exclusively from the JWT**.
* User identity must never be trusted from:

  * Request body
  * Query parameters
  * URL path parameters

---

### 5.2 Ownership Enforcement

* Every task **must belong to exactly one user**.
* All database queries must include:

  ```sql
  WHERE tasks.user_id = <authenticated_user_id>
  ```
* Cross‑user access is strictly forbidden.

Violation of this rule is considered a **critical security failure**.

---

## 6. API Constitution

### 6.1 REST API Stability

* All API routes must be located under `/api/`.
* Endpoints must remain RESTful and resource‑oriented.

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

### 6.2 Authentication Requirement

* All API endpoints require JWT authentication.
* There are **no public task endpoints**.

---

### 6.3 Behavior Consistency

* API behavior must exactly match `/specs/api/rest-endpoints.md`.
* Any change in behavior requires a spec update first.

---

## 7. Backend Law (FastAPI)

### 7.1 Framework Rules

* Backend must use:

  * FastAPI
  * SQLModel
  * Pydantic schemas

---

### 7.2 JWT Verification Middleware

* A global dependency or middleware must:

  * Extract JWT from headers
  * Verify signature
  * Decode user identity
  * Reject unauthorized requests early

---

### 7.3 Database Rules

* SQLModel is mandatory for all database access.
* Direct SQL queries are prohibited unless explicitly specified.
* Database connection must be configured via:

  ```
  DATABASE_URL
  ```

---

## 8. Frontend Law (Next.js)

### 8.1 Framework Rules

* Must use Next.js App Router.
* TypeScript is mandatory.
* Tailwind CSS is the only styling solution.

---

### 8.2 API Access Rule

* All backend calls must go through a centralized API client:

  ```
  /frontend/lib/api.ts
  ```
* JWT must be automatically attached to every request.

---

### 8.3 Auth Boundary

* Frontend is responsible for:

  * Login
  * Logout
  * Token storage
* Backend must never render UI or handle login flows.

---

## 9. Database Constitution

### 9.1 Schema Authority

* Database schema is defined exclusively in `/specs/database/schema.md`.
* Any schema change requires a spec update.

---

### 9.2 Task Table Law

Each task must include:

* `id` (primary key)
* `user_id` (foreign key)
* `title` (required)
* `description` (optional)
* `completed` (boolean)
* `created_at`
* `updated_at`

---

## 10. Error Handling & Responses

* Errors must be returned as JSON.
* Authentication errors → `401`.
* Authorization errors → `403`.
* Missing resources → `404`.
* Validation errors → `422`.

---

## 11. Phase Enforcement

### 11.1 Phase II Limitations

Phase II **must not include**:

* Chatbot functionality
* AI features
* MCP tools

These are reserved for Phase III.

---

## 12. Final Authority Clause

If there is a conflict between:

1. Code
2. Prompts
3. Informal instructions
4. Specs

This constitution and the written specs **always win**.

Any implementation violating this document is **invalid**, regardless of functionality.
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.