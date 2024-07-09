package entities

import (
	"time"

	"github.com/google/uuid"
)

type NoteType string

const (
	Evet  NoteType = "evet"
	Learn NoteType = "learn"
	Next  NoteType = "next"
)

type Note struct {
	ID       uuid.UUID
	ReviewId uuid.UUID
	Note     string
	Type     NoteType
	CreateAt time.Time
	UpdateAt time.Time
}

type Notes []Note

func NewNote(
	id uuid.UUID,
	reviewId uuid.UUID,
	note string,
	noteType NoteType,
	createAt time.Time,
	updateAt time.Time,
) *Note {
	return &Note{
		ID:       id,
		ReviewId: reviewId,
		Note:     note,
		Type:     noteType,
		CreateAt: createAt,
		UpdateAt: updateAt,
	}
}
