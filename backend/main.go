package main

import (
	"log"

	"github.com/hokita/owl/application"
)

func main() {
	if err := application.Run(); err != nil {
		log.Fatalln(err)
	}
}
