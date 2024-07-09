package application

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/hokita/owl/application/handlers"
	"github.com/hokita/owl/application/validation"
	"github.com/hokita/owl/infra/repositories"
	_ "github.com/mattn/go-sqlite3"
)

func Run() error {
	db, err := sql.Open("sqlite3", "./sqlite/owl.db")
	if err != nil {
		return err
	}
	defer db.Close()

	validation.InitializeValidator()

	reviewRepository := repositories.NewReviewRepository(db)

	handlers := handlers.NewReviewHandler(reviewRepository)

	http.HandleFunc("/review", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handlers.GetAll(w, r)
		case http.MethodPost:
			handlers.Create(w, r)
		default:
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		}
	})

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
	return nil
}
