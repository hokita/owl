package repositories

import (
	"github.com/hokita/owl/application/requests"
	"github.com/hokita/owl/domain/entities"
)

type ReviewRepository interface {
	GetAll() ([]*entities.Review, error)
	Create(req requests.CreateReviewRequest) error
}
