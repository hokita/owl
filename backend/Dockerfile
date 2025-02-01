FROM golang:1.23-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /go/bin/app

FROM scratch
COPY --from=build /go/bin/app /app
EXPOSE 8080
ENTRYPOINT ["/app"]
