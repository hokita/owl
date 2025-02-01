import { graphql } from "@/gql";

export const CreateReview = graphql(`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      year
      month
      week
      created_at
      updated_at
    }
  }
`);

export const CreateNote = graphql(`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      review_id
      content
      type
      created_at
      updated_at
    }
  }
`);

export const DeleteNote = graphql(`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
      content
      type
      created_at
      updated_at
    }
  }
`);
