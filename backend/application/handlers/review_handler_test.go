package handlers

// import (
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"
//
// 	"github.com/hokita/owl/infra/repositories"
// )

// func TestReviewHandler(t *testing.T) {
// 	// Create a new request
// 	req, err := http.NewRequest("GET", "/reviews", nil)
// 	if err != nil {
// 		t.Fatal(err)
// 	}
//
// 	rec := httptest.NewRecorder()
// 	reviewRepository := repositories.NewReviewRepository()
// 	reviewHandler := NewReviewHandler(reviewRepository)
// 	handler := http.HandlerFunc(reviewHandler.GetByMonth)
// 	handler.ServeHTTP(rec, req)
//
// 	// Check the status code
// 	if status := rec.Code; status != http.StatusOK {
// 		t.Errorf("handler returned wrong status code: got %v want %v",
// 			status, http.StatusOK)
// 	}
//
// 	// Check the response body
// 	expected := `{"ID":"422ebd2e-0e4d-4ed8-95b5-3d3fccd6dad6","Type":"week","Year":2024,"Month":1,"Week":1,"Notes":[{"ID":"163071e1-0b04-4fcc-8c1c-aa8fa4fd0442","ReviewId":"422ebd2e-0e4d-4ed8-95b5-3d3fccd6dad6","Note":"test","Type":"event","CreateAt":"2024-06-16T14:18:05.530423+09:00","UpdateAt":"2024-06-16T14:18:05.530423+09:00"}],"CreatedAt":"2024-06-16T14:18:05.530423+09:00","UpdatedAt":"2024-06-16T14:18:05.530423+09:00"}`
// 	if rec.Body.String() != expected {
// 		t.Errorf("handler returned unexpected body: got %v want %v",
// 			rec.Body.String(), expected)
// 	}
// }
