import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Bookmark = {
  __typename?: "Bookmark";
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  createdAt: Scalars["String"];
  url: Scalars["String"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type Mutation = {
  __typename?: "Mutation";
  add_bookmark?: Maybe<Bookmark>;
  delete_bookmark?: Maybe<Bookmark>;
};

export type MutationAdd_BookmarkArgs = {
  title: Scalars["String"];
  description: Scalars["String"];
  url: Scalars["String"];
};

export type MutationDelete_BookmarkArgs = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
};

export type BookmarkListQueryVariables = Exact<{ [key: string]: never }>;

export type BookmarkListQuery = { __typename?: "Query" } & {
  bookmarks?: Maybe<
    Array<
      Maybe<
        { __typename?: "Bookmark" } & Pick<
          Bookmark,
          "id" | "description" | "title" | "createdAt" | "url"
        >
      >
    >
  >;
};

export const BookmarkListDocument = gql`
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

/**
 * __useBookmarkListQuery__
 *
 * To run a query within a React component, call `useBookmarkListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkListQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookmarkListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BookmarkListQuery,
    BookmarkListQueryVariables
  >
) {
  return Apollo.useQuery<BookmarkListQuery, BookmarkListQueryVariables>(
    BookmarkListDocument,
    baseOptions
  );
}
export function useBookmarkListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BookmarkListQuery,
    BookmarkListQueryVariables
  >
) {
  return Apollo.useLazyQuery<BookmarkListQuery, BookmarkListQueryVariables>(
    BookmarkListDocument,
    baseOptions
  );
}
export type BookmarkListQueryHookResult = ReturnType<
  typeof useBookmarkListQuery
>;
export type BookmarkListLazyQueryHookResult = ReturnType<
  typeof useBookmarkListLazyQuery
>;
export type BookmarkListQueryResult = Apollo.QueryResult<
  BookmarkListQuery,
  BookmarkListQueryVariables
>;
