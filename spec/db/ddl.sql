-- Database schema for Owl monthly review application
-- MySQL/MariaDB compatible DDL

-- Reviews table: stores monthly review records
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) NOT NULL PRIMARY KEY COMMENT 'UUID identifier',
    year INT NOT NULL COMMENT 'Review year',
    month INT NOT NULL COMMENT 'Review month (1-12)',
    created_at DATETIME NOT NULL COMMENT 'Timestamp when record was created',
    updated_at DATETIME NOT NULL COMMENT 'Timestamp when record was last updated',
    UNIQUE KEY unique_year_month (year, month),
    INDEX idx_year_month (year, month)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notes table: stores individual notes within reviews
CREATE TABLE IF NOT EXISTS notes (
    id VARCHAR(36) NOT NULL PRIMARY KEY COMMENT 'UUID identifier',
    review_id VARCHAR(36) NOT NULL COMMENT 'Foreign key to reviews table',
    content TEXT NOT NULL COMMENT 'Note content',
    type VARCHAR(50) NOT NULL COMMENT 'Note type/category',
    created_at DATETIME NOT NULL COMMENT 'Timestamp when record was created',
    updated_at DATETIME NOT NULL COMMENT 'Timestamp when record was last updated',
    INDEX idx_review_id (review_id),
    INDEX idx_type (type),
    CONSTRAINT fk_notes_review_id
        FOREIGN KEY (review_id)
        REFERENCES reviews(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
