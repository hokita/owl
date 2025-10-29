---
description: Run static checks and tests for the entire project
---

Run static checks and tests for both backend and frontend:

## Backend (Go)

1. Navigate to the backend directory and run tests:
   - Run `go test ./...` to execute all tests
   - Report any test failures

## Frontend (Vue 3)

2. Navigate to the frontend directory and run:
   - Run `npm run type-check` to verify TypeScript types
   - Run `npm run lint` to check for linting issues
   - Run `npm run test:unit` to execute unit tests
   - Report any failures or errors

## Summary

3. Provide a summary of all checks:
   - List which checks passed
   - List which checks failed (if any)
   - Suggest fixes for any failures

Important: Run all checks even if some fail, to provide a complete picture of the project's health.
