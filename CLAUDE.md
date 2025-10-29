# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Owl is a monthly review application with a Go/GraphQL backend and Vue 3 frontend. The application allows users to create and manage monthly reviews with associated notes.

## Architecture

### Monorepo Structure

The repository is organized as a monorepo with two main directories:

- **backend/**: Go server using gqlgen for GraphQL API
- **frontend/**: Vue 3 SPA with TypeScript, Vite, and Apollo Client

### Backend (Go + GraphQL)

- **Framework**: gqlgen (GraphQL server library)
- **Database**: MySQL with direct SQL queries (no ORM)
- **Schema-first approach**: GraphQL schema defined in `backend/graph/schema.graphqls`
- **Generated code**: `backend/graph/generated.go` and models in `backend/graph/model/`
- **Resolvers**: Located in `backend/graph/schema.resolvers.go` (auto-regenerated, implementations preserved)
- **Dependency injection**: The `Resolver` struct in `backend/graph/resolver.go` holds the DB connection

#### Key Backend Patterns

- Environment-based configuration (development vs production)
- CORS configured via `CORS_ALLOW_ORIGINS` environment variable
- GraphQL Playground available in development mode at root path (`/`)
- GraphQL endpoint at `/query`
- Database transactions used for multi-step operations (e.g., creating reviews with notes)
- UUIDs generated for entity IDs using `github.com/google/uuid`

### Frontend (Vue 3 + TypeScript)

- **Framework**: Vue 3 with Composition API
- **Build tool**: Vite
- **State management**: Pinia
- **Routing**: Vue Router
- **GraphQL client**: Apollo Client (`@apollo/client` + `@vue/apollo-composable`)
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Vue Test Utils

#### Code Generation

GraphQL types are auto-generated from the backend schema:

- Configuration in `frontend/codegen.ts`
- Fetches schema from GitHub (main branch)
- Generates TypeScript types to `frontend/src/gql/`
- Scans `.vue` and `.ts` files for GraphQL operations

### Data Model

The application manages two main entities:

- **Review**: Represents a monthly review (year, month) with multiple notes
- **Note**: Individual notes within a review, each with content and type

## Common Development Commands

### Backend

```bash
cd backend

# Run development server
go run server.go

# Regenerate GraphQL code after schema changes
go run github.com/99designs/gqlgen generate

# Build binary
go build -o owl server.go

# Run tests
go test ./...
```

**Environment variables** (in `backend/.env` for development):
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_ENDPOINT`: MySQL endpoint (e.g., `localhost:3306`)
- `CORS_ALLOW_ORIGINS`: Comma-separated allowed origins
- `PORT`: Server port (default: 8080)
- `ENV`: Environment name (development/production)

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Run tests
npm run test:unit

# Lint and fix
npm run lint

# Format code
npm run format

# Regenerate GraphQL types from schema
npm run generate
```

**Environment variables**:
- `VITE_BACKEND_URL`: GraphQL endpoint URL (in `.env.development` or `.env.production`)

## Making Schema Changes

When modifying the GraphQL schema:

1. Update `backend/graph/schema.graphqls`
2. Regenerate backend code: `cd backend && go run github.com/99designs/gqlgen generate`
3. Implement resolver logic in `backend/graph/schema.resolvers.go`
4. Regenerate frontend types: `cd frontend && npm run generate`
5. Update frontend components to use new types/operations

## Database Schema

The application uses MySQL with these tables:
- `reviews`: id (UUID), year, month, created_at, updated_at
- `notes`: id (UUID), review_id (foreign key), content, type, created_at, updated_at

Database queries are written in raw SQL (no ORM). Look at `backend/graph/schema.resolvers.go` for examples.

## Docker

Both backend and frontend have Dockerfiles for containerization:
- Backend uses multi-stage build (golang:1.23-alpine → scratch)
- CI/CD workflows for building Docker images in `.github/workflows/`
