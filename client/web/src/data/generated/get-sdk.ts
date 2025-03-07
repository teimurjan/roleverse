import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  generateChallenge: Scalars['String']['output'];
  likePost: Post;
  logOut: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
  signIn: Scalars['Boolean']['output'];
  unlikePost: Post;
};


export type MutationCreatePostArgs = {
  text: Scalars['String']['input'];
};


export type MutationGenerateChallengeArgs = {
  walletAddress: Scalars['String']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  signature: Scalars['String']['input'];
  username: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  signature: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<User>>;
  links?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<User>>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  explore: Array<Post>;
  feed: Array<Post>;
  followCount: UserFollowCount;
  followers: Array<User>;
  following: Array<User>;
  me: User;
  posts: Array<Post>;
};


export type QueryExploreArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryFeedArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryFollowCountArgs = {
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFollowersArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFollowingArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsArgs = {
  liked?: Scalars['Boolean']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
  walletAddress: Scalars['String']['output'];
};

export type UserFollowCount = {
  __typename?: 'UserFollowCount';
  followers: Scalars['Float']['output'];
  following: Scalars['Float']['output'];
};

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, text: string, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, likes?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null } };

export type ExploreQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExploreQuery = { __typename?: 'Query', explore: Array<{ __typename?: 'Post', id: string, text: string, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, likes?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type FeedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Post', id: string, text: string, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, likes?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type FollowCountQueryVariables = Exact<{
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type FollowCountQuery = { __typename?: 'Query', followCount: { __typename?: 'UserFollowCount', following: number, followers: number } };

export type FollowersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type FollowersQuery = { __typename?: 'Query', followers: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> };

export type FollowingQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type FollowingQuery = { __typename?: 'Query', following: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> };

export type GenerateChallengeMutationVariables = Exact<{
  walletAddress: Scalars['String']['input'];
}>;


export type GenerateChallengeMutation = { __typename?: 'Mutation', generateChallenge: string };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Post', id: string } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any } };

export type PostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  liked?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, text: string, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, likes?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type RegisterMutationVariables = Exact<{
  signature: Scalars['String']['input'];
  username: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type SignInMutationVariables = Exact<{
  signature: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: boolean };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'Post', id: string } };


export const CreatePostDocument = gql`
    mutation CreatePost($text: String!) {
  createPost(text: $text) {
    id
    text
    user {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    likes {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    links
    tags {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const ExploreDocument = gql`
    query Explore($limit: Int, $offset: Int) {
  explore(limit: $limit, offset: $offset) {
    id
    text
    user {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    likes {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    links
    tags {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const FeedDocument = gql`
    query Feed($limit: Int, $offset: Int) {
  feed(limit: $limit, offset: $offset) {
    id
    text
    user {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    likes {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    links
    tags {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const FollowCountDocument = gql`
    query FollowCount($walletAddress: String) {
  followCount(walletAddress: $walletAddress) {
    following
    followers
  }
}
    `;
export const FollowersDocument = gql`
    query Followers($limit: Int, $offset: Int, $walletAddress: String) {
  followers(limit: $limit, offset: $offset, walletAddress: $walletAddress) {
    id
    walletAddress
    username
    createdAt
    updatedAt
  }
}
    `;
export const FollowingDocument = gql`
    query Following($limit: Int, $offset: Int, $walletAddress: String) {
  following(limit: $limit, offset: $offset, walletAddress: $walletAddress) {
    id
    walletAddress
    username
    createdAt
    updatedAt
  }
}
    `;
export const GenerateChallengeDocument = gql`
    mutation GenerateChallenge($walletAddress: String!) {
  generateChallenge(walletAddress: $walletAddress)
}
    `;
export const LikePostDocument = gql`
    mutation LikePost($postId: String!) {
  likePost(postId: $postId) {
    id
  }
}
    `;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    id
    walletAddress
    username
    createdAt
    updatedAt
  }
}
    `;
export const PostsDocument = gql`
    query Posts($limit: Int, $offset: Int, $liked: Boolean) {
  posts(limit: $limit, offset: $offset, liked: $liked) {
    id
    text
    user {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    likes {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    links
    tags {
      id
      walletAddress
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const RegisterDocument = gql`
    mutation Register($signature: String!, $username: String!, $walletAddress: String!) {
  register(
    signature: $signature
    username: $username
    walletAddress: $walletAddress
  )
}
    `;
export const SignInDocument = gql`
    mutation SignIn($signature: String!, $walletAddress: String!) {
  signIn(signature: $signature, walletAddress: $walletAddress)
}
    `;
export const UnlikePostDocument = gql`
    mutation UnlikePost($postId: String!) {
  unlikePost(postId: $postId) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation', variables);
    },
    Explore(variables?: ExploreQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ExploreQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExploreQuery>(ExploreDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Explore', 'query', variables);
    },
    Feed(variables?: FeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedQuery>(FeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Feed', 'query', variables);
    },
    FollowCount(variables?: FollowCountQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FollowCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FollowCountQuery>(FollowCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FollowCount', 'query', variables);
    },
    Followers(variables?: FollowersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FollowersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FollowersQuery>(FollowersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Followers', 'query', variables);
    },
    Following(variables?: FollowingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FollowingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FollowingQuery>(FollowingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Following', 'query', variables);
    },
    GenerateChallenge(variables: GenerateChallengeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GenerateChallengeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<GenerateChallengeMutation>(GenerateChallengeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GenerateChallenge', 'mutation', variables);
    },
    LikePost(variables: LikePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LikePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikePostMutation>(LikePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LikePost', 'mutation', variables);
    },
    LogOut(variables?: LogOutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogOutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogOutMutation>(LogOutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LogOut', 'mutation', variables);
    },
    Me(variables?: MeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Me', 'query', variables);
    },
    Posts(variables?: PostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Posts', 'query', variables);
    },
    Register(variables: RegisterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Register', 'mutation', variables);
    },
    SignIn(variables: SignInMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SignInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInMutation>(SignInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SignIn', 'mutation', variables);
    },
    UnlikePost(variables: UnlikePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UnlikePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnlikePostMutation>(UnlikePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UnlikePost', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;