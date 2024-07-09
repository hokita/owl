package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hokita/owl/application/requests"
	"github.com/hokita/owl/application/validation"
	"github.com/hokita/owl/domain/repositories"
)

type ReviewHnadler struct {
	repository repositories.ReviewRepository
}

func NewReviewHandler(repository repositories.ReviewRepository) *ReviewHnadler {
	return &ReviewHnadler{repository: repository}
}

func (h *ReviewHnadler) GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reviews, err := h.repository.GetAll()
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(reviews)
}

func (h *ReviewHnadler) Create(w http.ResponseWriter, r *http.Request) {
	var req requests.CreateReviewRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err := validation.Validate.Struct(req)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := h.repository.Create(req); err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
