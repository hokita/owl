package validation

import (
	"github.com/go-playground/validator/v10"
)

var Validate *validator.Validate

func InitializeValidator() {
	Validate = validator.New()
	Validate.RegisterValidation("reviewType", reviewTypeValidation)
}

func reviewTypeValidation(fl validator.FieldLevel) bool {
	switch fl.Field().String() {
	case "yearly", "monthly", "weekly":
		return true
	default:
		return false
	}
}
