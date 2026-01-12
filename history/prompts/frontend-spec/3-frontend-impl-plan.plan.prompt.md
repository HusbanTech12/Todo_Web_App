---
id: 3
title: frontend-impl-plan
stage: plan
date: 2026-01-13
surface: agent
model: claude-sonnet-4-5-20250929
feature: frontend-spec
branch: 001-frontend-spec
user: claude
command: /sp.plan
labels: [frontend, planning, implementation, todo-app, authentication, task-management]
links:
  spec: specs/001-frontend-spec/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-frontend-spec/plan.md
 - specs/001-frontend-spec/research.md
 - specs/001-frontend-spec/data-model.md
 - specs/001-frontend-spec/quickstart.md
 - specs/001-frontend-spec/contracts/api-contract.yml
 - CLAUDE.md
tests:
 - none
---

## Prompt

```
# /sp.plan

## 1. Purpose

This plan defines the **authorized implementation workflow** for the Hackathon Todo Application – Phase II. It operationalizes the rules in `/sp.constitution` and the frontend/backend `/sp.specify` specifications.

All development must follow this order. Deviations require a spec update and constitutional review.

---

## 2. Governing Authority

This plan is subordinate to:

1. `/sp.constitution`
2. `/sp.specify` (frontend & backend)
3. `/specs/**` specifications

Any conflict defaults to `/sp.constitution`.

---

## 3. Phase II Scope

**Included:**

* Multi-user Todo CRUD functionality
* JWT-based authentication (Better Auth)
* Persistent Neon PostgreSQL storage
* Full Spec-Kit workflow

**Excluded:**

* Chatbot / AI features
* MCP tools

---

## 4. Repository & Monorepo Initialization

1. Initialize Git repository
2. Creaccess

### 6.3 Database Models

* Implement `Task` model per `/specs/database/schema.md`
* Enforce `user_id` ownership in all queries
* Include required indexes for filtering

### 6.4 REST API Routes

* Implement endpoints in order:

  1. `GET /api/tasks`
  2. `POST /api/tasks`
  3. `GET /api/tasks/{id}`
  4. `PUT /api/tasks/{id}`
  5. `PATCH /api/tasks/{id}/complete`
  6. `DELETE /api/tasks/{id}`
* All routes must:

  * Validate requests with Pydantic
  * Filter tasks by authenticated `user_id`
  * Return consistent JSON responses

---

## 7. Frontend Implementation Plan

### 7.1 Bootstrapping

* Initialize Next.js App Router in `/frontend`
* Configure TypeScript
* Configure Tailwind CSS

### 7.2 Better Auth Integration

* Install and configure Better Auth with JWT plugin
* Ensure `BETTER_AUTH_SECRET` matches backend
* Implement login/signup pages

### 7.3 API Client

* Implement `/frontend/lib/api.ts`
* Automatically attach JWT to all requests
* Handle 401/403 errors gracefully
* Centralize all backend API communication

### 7.4 UI Features

* Implement pages/components per `/specs/ui/pages.md` & `/specs/ui/components.md`
* Task List, Detail, Create, Edit, Complete toggle, Delete
* UI must reflect backend data truth

---

## 8. Integration & Validation

1. Confirm JWT issuance and propagation
2. Verify all endpoints reject unauthorized access
3. Validate user isolation: no user sees other users' tasks
4. Confirm frontend UI accurately reflects backend state

---

## 9. Error Handling Validation

* Authentication errors → `401`
* Authorization errors → `403`
* Missing resources → `404`
* Validation errors → `422`
* Errors returned as JSON consistently

---

## 10. Completion Criteria

Phase II considered complete when:

* All specs implemented in frontend and backend
* CRUD functionality works per authenticated user
* JWT authentication fully enforced
* Data persisted in Neon PostgreSQL
* No constitutional violations

---

## 11. Change Control

* No feature may be added without spec and constitutional update
* All changes must pass `/sp.constitution` compliance check

---

## 12. Enforcement Statement

This plan is binding. Any implementation outside this plan or `/sp.constitution` is **invalid**.
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

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