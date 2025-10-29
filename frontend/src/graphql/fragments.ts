import { graphql } from "@/gql";

export const ReviewFields = graphql(`
  fragment ReviewFields on Review {
    id
    year
    month
    notes {
      ...NoteFields
    }
  }
`);

export const NoteFields = graphql(`
  fragment NoteFields on Note {
    id
    type
    content
  }
`);
