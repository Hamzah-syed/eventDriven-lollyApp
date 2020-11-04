import { gql } from "@apollo/client";

export const CREATE_LOLLY = gql`
  mutation createLolly(
    $to: String!
    $message: String!
    $from: String!
    $flavourTop: String!
    $flavourMiddle: String!
    $flavourBottom: String!
    $slug: String!
  ) {
    craeteLolly(
      to: $to
      message: $message
      from: $from
      flavourTop: $flavourTop
      flavourMiddle: $flavourMiddle
      flavourBottom: $flavourBottom
      slug: $slug
    ) {
      slug
    }
  }
`;
