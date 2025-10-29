# Database Schema Documentation

This document describes the database schema for the Owl monthly review application.

## Overview

The application uses MySQL as its database backend with two main tables: `reviews` and `notes`. The schema follows a one-to-many relationship where each review can contain multiple notes.

## Tables

### reviews

Stores monthly review records. Each review represents a unique year-month combination.

| Column       | Type         | Constraints         | Description                              |
|--------------|--------------|---------------------|------------------------------------------|
| id           | VARCHAR(36)  | PRIMARY KEY         | UUID identifier for the review           |
| year         | INT          | NOT NULL            | Review year (e.g., 2025)                 |
| month        | INT          | NOT NULL            | Review month (1-12)                      |
| created_at   | DATETIME     | NOT NULL            | Timestamp when record was created        |
| updated_at   | DATETIME     | NOT NULL            | Timestamp when record was last updated   |

**Constraints:**
- Primary key: `id`
- Unique constraint: `(year, month)` - Ensures only one review per month

**Indexes:**
- `idx_year_month` on `(year, month)` - Optimizes queries by year and month

### notes

Stores individual notes within reviews. Each note belongs to exactly one review.

| Column       | Type         | Constraints         | Description                              |
|--------------|--------------|---------------------|------------------------------------------|
| id           | VARCHAR(36)  | PRIMARY KEY         | UUID identifier for the note             |
| review_id    | VARCHAR(36)  | NOT NULL, FK        | Foreign key reference to reviews.id      |
| content      | TEXT         | NOT NULL            | Note content/body                        |
| type         | VARCHAR(50)  | NOT NULL            | Note type or category                    |
| created_at   | DATETIME     | NOT NULL            | Timestamp when record was created        |
| updated_at   | DATETIME     | NOT NULL            | Timestamp when record was last updated   |

**Constraints:**
- Primary key: `id`
- Foreign key: `review_id` references `reviews(id)` with CASCADE delete

**Indexes:**
- `idx_review_id` on `review_id` - Optimizes queries filtering by review
- `idx_type` on `type` - Optimizes queries filtering by note type

## Relationships

```
reviews (1) ──< (many) notes
```

- One review can have many notes
- Each note belongs to exactly one review
- When a review is deleted, all associated notes are automatically deleted (CASCADE)

## Key Design Decisions

### UUID Identifiers

UUIDs are used as primary keys instead of auto-incrementing integers to:
- Prevent ID enumeration attacks
- Allow distributed ID generation
- Enable client-side ID generation if needed
- Avoid conflicts when merging data from multiple sources

### Unique Month Constraint

The `(year, month)` unique constraint ensures that:
- Only one review can exist per month
- Data integrity is maintained at the database level
- Application logic can safely query by year-month without checking for duplicates

### Cascade Deletion

Foreign key with `ON DELETE CASCADE` ensures:
- Referential integrity is maintained
- Orphaned notes are automatically cleaned up when a review is deleted
- Simplified application logic for delete operations

### Timestamps

Both `created_at` and `updated_at` timestamps provide:
- Audit trail of when records were created
- Ability to track when records were last modified
- Useful for debugging and data analysis

## Character Set

Tables use `utf8mb4` character set with `utf8mb4_unicode_ci` collation to:
- Support full Unicode including emoji characters
- Ensure proper sorting for international text
- Provide compatibility with modern applications
