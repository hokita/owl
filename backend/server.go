package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/hokita/owl/graph"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {
	// Get environment variables
	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}

	if env != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatalf("failed to load .env: %v", err)
		}
	}

	dbUser := os.Getenv("DB_USER")
	if dbUser == "" {
		log.Fatalf("DB_USER is not set")
	}
	dbPassword := os.Getenv("DB_PASSWORD")
	if dbPassword == "" {
		log.Fatalf("DB_PASSWORD is not set")
	}
	dbEndpoint := os.Getenv("DB_ENDPOINT")
	if dbEndpoint == "" {
		log.Fatalf("DB_ENDPOINT is not set")
	}
	corsAlllowOrigins := os.Getenv("CORS_ALLOW_ORIGINS")
	if corsAlllowOrigins == "" {
		log.Fatalf("CORS_ALLOW_ORIGINS is not set")
	}

	// Connect to the database
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/owl?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbEndpoint)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("failed to open a database connection: %v", err)
	}
	defer db.Close()

	// Check the connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("failed to ping the database: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db}}))

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   strings.Split(corsAlllowOrigins, ","),
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
	})

	if env == "development" {
		http.Handle("/", playground.Handler("GraphQL playground", "/query"))
		log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	}
	http.Handle("/query", c.Handler(srv))
	log.Println("start server")
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
