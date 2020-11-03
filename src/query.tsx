import { gql } from "@apollo/client";

export const bookmarkList = gql`
  query bookmarkList {
    bookmarks {
      id
      description
      title
      createdAt
      url
    }
  }
`;
