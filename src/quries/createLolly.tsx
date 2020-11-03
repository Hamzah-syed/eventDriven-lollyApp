import { gql } from "@apollo/client";

const CREATE_LOLLY = gql`
  mutation createLolly(
    $to: String!
    $message: String!
    $from: String!
    $flavourTop: String!
    $flavourMiddle: String!
    $flavourBottom: String!
  ) {
    craeteLolly(
      to: $to
      message: $message
      from: $from
      flavourTop: $flavourTop
      flavourMiddle: $flavourMiddle
      flavourBottom: $flavourBottom
    ) {
      slug
    }
  }
`;
