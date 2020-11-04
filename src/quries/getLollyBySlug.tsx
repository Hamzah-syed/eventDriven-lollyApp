import { gql } from "@apollo/client";

export const GET_LOLLY_BY_SLUG = gql`
  query GetLollyBySlug($slug: String!) {
    GetLollyBySlug(slug: $slug) {
      to
      message
      from
      flavourTop
      flavourMiddle
      flavourBottom
    }
  }
`;
