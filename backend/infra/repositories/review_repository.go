package repositories

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/hokita/owl/application/requests"
	"github.com/hokita/owl/domain/entities"
	"github.com/hokita/owl/domain/repositories"
	"github.com/hokita/owl/infra/responses"
)

var _ repositories.ReviewRepository = (*ReviewRepository)(nil)

type ReviewRepository struct {
	db *sql.DB
}

func NewReviewRepository(db *sql.DB) *ReviewRepository {
	return &ReviewRepository{db: db}
}

func (r *ReviewRepository) GetAll() ([]*entities.Review, error) {
	query := `SELECT id, type, year, month, week, created_at, updated_at FROM reviews;`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reviews := []*entities.Review{}
	for rows.Next() {
		var response responses.Review
		err := rows.Scan(
			&response.ID,
			&response.Type,
			&response.Year,
			&response.Month,
			&response.Week,
			&response.CreatedAt,
			&response.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		review, err := responses.CreateReview(response)
		if err != nil {
			return nil, err
		}

		reviews = append(reviews, review)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return reviews, nil
}

func (r *ReviewRepository) Create(req requests.CreateReviewRequest) error {
	query := `INSERT INTO reviews (id, type, year, month, week, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ?, ?);`

	stmt, err := r.db.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	id := uuid.New()

	var month sql.NullInt64
	if req.Month == 0 {
		month.Valid = false
	} else {
		month = sql.NullInt64{Int64: int64(req.Month), Valid: true}
	}

	var week sql.NullInt64
	if req.Week == 0 {
		week.Valid = false
	} else {
		week = sql.NullInt64{Int64: int64(req.Week), Valid: true}
	}

	var now = time.Now()

	_, err = stmt.Exec(id, req.Type, req.Year, month, week, now, now)
	if err != nil {
		return err
	}

	return nil
}
