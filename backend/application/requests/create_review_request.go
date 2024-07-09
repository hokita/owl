package requests

type CreateReviewRequest struct {
	Type  string `json:"type" validate:"required,reviewType"`
	Year  int    `json:"year" validate:"required"`
	Month int    `json:"month" validate:"gte=0,lte=12"`
	Week  int    `json:"week" validate:"gte=0,lte=5"`
}
