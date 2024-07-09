package responses

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/hokita/owl/domain/entities"
)

type Review struct {
	ID        uuid.UUID
	Type      string
	Year      int
	Month     sql.NullInt64
	Week      sql.NullInt64
	CreatedAt time.Time
	UpdatedAt time.Time
}

func CreateReview(
	review Review,
) (*entities.Review, error) {
	rt, err := entities.NewReviewType(review.Type)
	if err != nil {
		return nil, err
	}
	var m int
	if review.Month.Valid {
		m = int(review.Month.Int64)
	} else {
		m = 0
	}
	var w int
	if review.Week.Valid {
		w = int(review.Week.Int64)
	} else {
		w = 0
	}

	return &entities.Review{
		ID:        review.ID,
		Type:      rt,
		Year:      review.Year,
		Month:     m,
		Week:      w,
		CreatedAt: review.CreatedAt,
		UpdatedAt: review.UpdatedAt,
	}, nil
}
