package entities

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type ReviewType string

const (
	Yearly  ReviewType = "yearly"
	Monthly ReviewType = "monthly"
	Weekly  ReviewType = "weekly"
)

func NewReviewType(rt string) (ReviewType, error) {
	switch ReviewType(rt) {
	case Yearly:
		return Yearly, nil
	case Monthly:
		return Monthly, nil
	case Weekly:
		return Weekly, nil
	default:
		return "", errors.New("invalid review type")
	}
}

type Review struct {
	ID        uuid.UUID
	Type      ReviewType
	Year      int
	Month     int
	Week      int
	Notes     Notes
	CreatedAt time.Time
	UpdatedAt time.Time
}
