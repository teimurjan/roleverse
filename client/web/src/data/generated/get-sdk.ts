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

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<User>>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  generateChallenge: Scalars['String']['output'];
  likePost: Post;
  logOut: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
  signIn: Scalars['Boolean']['output'];
  unlikePost: Post;
};


export type MutationCreateCommentArgs = {
  postId: Scalars['String']['input'];
  text: Scalars['String']['input'];
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
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  isLiked: Scalars['Boolean']['output'];
  likesCount: Scalars['Int']['output'];
  links?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<User>>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  explore: Array<Post>;
  feed: Array<Post>;
  followCount: UserFollowCount;
  followers: Array<User>;
  following: Array<User>;
  likedPosts: Array<Post>;
  me: User;
  post: Post;
  user: User;
  userPosts: Array<Post>;
};


export type QueryCommentsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  postId: Scalars['String']['input'];
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
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFollowersArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFollowingArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLikedPostsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryPostArgs = {
  postId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserPostsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
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

export type Comment_Fragment = { __typename?: 'Comment', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null };

export type CommentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['String']['input'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String']['input'];
  postId: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null } };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null } };

export type ExploreQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExploreQuery = { __typename?: 'Query', explore: Array<{ __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type FeedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type FollowCountQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FollowCountQuery = { __typename?: 'Query', followCount: { __typename?: 'UserFollowCount', following: number, followers: number } };

export type FollowersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FollowersQuery = { __typename?: 'Query', followers: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> };

export type FollowingQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
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

export type LikedPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LikedPostsQuery = { __typename?: 'Query', likedPosts: Array<{ __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any } };

export type Post_Fragment = { __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null } };

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

export type UserPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
}>;


export type UserPostsQuery = { __typename?: 'Query', userPosts: Array<{ __typename?: 'Post', id: string, text: string, isLiked: boolean, likesCount: number, commentsCount: number, links?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }, tags?: Array<{ __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any }> | null }> };

export type User_Fragment = { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any };

export type UserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, walletAddress: string, username: string, createdAt: any, updatedAt: any } };

export const User_FragmentDoc = gql`
    fragment User_ on User {
  id
  walletAddress
  username
  createdAt
  updatedAt
}
    `;
export const Comment_FragmentDoc = gql`
    fragment Comment_ on Comment {
  id
  text
  user {
    ...User_
  }
  tags {
    ...User_
  }
  createdAt
  updatedAt
}
    ${User_FragmentDoc}`;
export const Post_FragmentDoc = gql`
    fragment Post_ on Post {
  id
  text
  user {
    ...User_
  }
  isLiked
  likesCount
  commentsCount
  links
  tags {
    ...User_
  }
  createdAt
  updatedAt
}
    ${User_FragmentDoc}`;
export const CommentsDocument = gql`
    query Comments($limit: Int, $offset: Int, $postId: String!) {
  comments(limit: $limit, offset: $offset, postId: $postId) {
    ...Comment_
  }
}
    ${Comment_FragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $postId: String!) {
  createComment(text: $text, postId: $postId) {
    ...Comment_
  }
}
    ${Comment_FragmentDoc}`;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!) {
  createPost(text: $text) {
    ...Post_
  }
}
    ${Post_FragmentDoc}`;
export const ExploreDocument = gql`
    query Explore($limit: Int, $offset: Int) {
  explore(limit: $limit, offset: $offset) {
    ...Post_
  }
}
    ${Post_FragmentDoc}`;
export const FeedDocument = gql`
    query Feed($limit: Int, $offset: Int) {
  feed(limit: $limit, offset: $offset) {
    ...Post_
  }
}
    ${Post_FragmentDoc}`;
export const FollowCountDocument = gql`
    query FollowCount($userId: String) {
  followCount(userId: $userId) {
    following
    followers
  }
}
    `;
export const FollowersDocument = gql`
    query Followers($limit: Int, $offset: Int, $userId: String) {
  followers(limit: $limit, offset: $offset, userId: $userId) {
    ...User_
  }
}
    ${User_FragmentDoc}`;
export const FollowingDocument = gql`
    query Following($limit: Int, $offset: Int, $userId: String) {
  following(limit: $limit, offset: $offset, userId: $userId) {
    ...User_
  }
}
    ${User_FragmentDoc}`;
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
export const LikedPostsDocument = gql`
    query LikedPosts($limit: Int, $offset: Int) {
  likedPosts(limit: $limit, offset: $offset) {
    ...Post_
  }
}
    ${Post_FragmentDoc}`;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    ...User_
  }
}
    ${User_FragmentDoc}`;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(postId: $postId) {
    ...Post_
  }
}
    ${Post_FragmentDoc}`;
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
export const UserPostsDocument = gql`
    query UserPosts($limit: Int, $offset: Int, $userId: String!) {
  userPosts(limit: $limit, offset: $offset, userId: $userId) {
    ...Post_
  }
}
    ${Post_FragmentDoc}`;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...User_
  }
}
    ${User_FragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Comments(variables: CommentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CommentsQuery>(CommentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Comments', 'query', variables);
    },
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>(CreateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateComment', 'mutation', variables);
    },
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
    LikedPosts(variables?: LikedPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LikedPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikedPostsQuery>(LikedPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LikedPosts', 'query', variables);
    },
    LogOut(variables?: LogOutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogOutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogOutMutation>(LogOutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LogOut', 'mutation', variables);
    },
    Me(variables?: MeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Me', 'query', variables);
    },
    Post(variables: PostQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostQuery>(PostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Post', 'query', variables);
    },
    Register(variables: RegisterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Register', 'mutation', variables);
    },
    SignIn(variables: SignInMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SignInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInMutation>(SignInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SignIn', 'mutation', variables);
    },
    UnlikePost(variables: UnlikePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UnlikePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnlikePostMutation>(UnlikePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UnlikePost', 'mutation', variables);
    },
    UserPosts(variables: UserPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserPostsQuery>(UserPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserPosts', 'query', variables);
    },
    User(variables: UserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;