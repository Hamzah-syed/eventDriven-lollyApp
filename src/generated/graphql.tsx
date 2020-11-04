import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Lolly = {
  __typename?: 'Lolly';
  to: Scalars['String'];
  message: Scalars['String'];
  from: Scalars['String'];
  flavourTop: Scalars['String'];
  flavourMiddle: Scalars['String'];
  flavourBottom: Scalars['String'];
  slug: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  craeteLolly?: Maybe<Lolly>;
};


export type MutationCraeteLollyArgs = {
  to: Scalars['String'];
  message: Scalars['String'];
  from: Scalars['String'];
  flavourTop: Scalars['String'];
  flavourMiddle: Scalars['String'];
  flavourBottom: Scalars['String'];
  slug: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  AllLollies: Array<Maybe<Lolly>>;
  GetLollyBySlug?: Maybe<Lolly>;
};


export type QueryGetLollyBySlugArgs = {
  slug: Scalars['String'];
};


export type CreateLollyMutationVariables = Exact<{
  to: Scalars['String'];
  message: Scalars['String'];
  from: Scalars['String'];
  flavourTop: Scalars['String'];
  flavourMiddle: Scalars['String'];
  flavourBottom: Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreateLollyMutation = (
  { __typename?: 'Mutation' }
  & { craeteLolly?: Maybe<(
    { __typename?: 'Lolly' }
    & Pick<Lolly, 'slug'>
  )> }
);

export type GetLollyBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetLollyBySlugQuery = (
  { __typename?: 'Query' }
  & { GetLollyBySlug?: Maybe<(
    { __typename?: 'Lolly' }
    & Pick<Lolly, 'to' | 'message' | 'from' | 'flavourTop' | 'flavourMiddle' | 'flavourBottom'>
  )> }
);


export const CreateLollyDocument = gql`
    mutation createLolly($to: String!, $message: String!, $from: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!, $slug: String!) {
  craeteLolly(to: $to, message: $message, from: $from, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom, slug: $slug) {
    slug
  }
}
    `;
export type CreateLollyMutationFn = Apollo.MutationFunction<CreateLollyMutation, CreateLollyMutationVariables>;

/**
 * __useCreateLollyMutation__
 *
 * To run a mutation, you first call `useCreateLollyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLollyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLollyMutation, { data, loading, error }] = useCreateLollyMutation({
 *   variables: {
 *      to: // value for 'to'
 *      message: // value for 'message'
 *      from: // value for 'from'
 *      flavourTop: // value for 'flavourTop'
 *      flavourMiddle: // value for 'flavourMiddle'
 *      flavourBottom: // value for 'flavourBottom'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCreateLollyMutation(baseOptions?: Apollo.MutationHookOptions<CreateLollyMutation, CreateLollyMutationVariables>) {
        return Apollo.useMutation<CreateLollyMutation, CreateLollyMutationVariables>(CreateLollyDocument, baseOptions);
      }
export type CreateLollyMutationHookResult = ReturnType<typeof useCreateLollyMutation>;
export type CreateLollyMutationResult = Apollo.MutationResult<CreateLollyMutation>;
export type CreateLollyMutationOptions = Apollo.BaseMutationOptions<CreateLollyMutation, CreateLollyMutationVariables>;
export const GetLollyBySlugDocument = gql`
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

/**
 * __useGetLollyBySlugQuery__
 *
 * To run a query within a React component, call `useGetLollyBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLollyBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLollyBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetLollyBySlugQuery(baseOptions?: Apollo.QueryHookOptions<GetLollyBySlugQuery, GetLollyBySlugQueryVariables>) {
        return Apollo.useQuery<GetLollyBySlugQuery, GetLollyBySlugQueryVariables>(GetLollyBySlugDocument, baseOptions);
      }
export function useGetLollyBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLollyBySlugQuery, GetLollyBySlugQueryVariables>) {
          return Apollo.useLazyQuery<GetLollyBySlugQuery, GetLollyBySlugQueryVariables>(GetLollyBySlugDocument, baseOptions);
        }
export type GetLollyBySlugQueryHookResult = ReturnType<typeof useGetLollyBySlugQuery>;
export type GetLollyBySlugLazyQueryHookResult = ReturnType<typeof useGetLollyBySlugLazyQuery>;
export type GetLollyBySlugQueryResult = Apollo.QueryResult<GetLollyBySlugQuery, GetLollyBySlugQueryVariables>;