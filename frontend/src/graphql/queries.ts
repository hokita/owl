import { graphql } from "@/gql";

export const GetWeekReview = graphql(`
  query GetWeekReview($year: Int!, $month: Int!, $week: Int!) {
    weekReview(year: $year, month: $month, week: $week) {
      ...ReviewFields
    }
  }
`);
