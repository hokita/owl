import { graphql } from "@/gql";

export const GetMonthReview = graphql(`
  query GetMonthReview($year: Int!, $month: Int!) {
    monthReview(year: $year, month: $month) {
      ...ReviewFields
    }
  }
`);
