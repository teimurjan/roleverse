import type { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigDecimal: { input: any; output: any }
  BigInt: { input: any; output: any }
  Bytes: { input: any; output: any }
  Int8: { input: any; output: any }
  Timestamp: { input: any; output: any }
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>
  number?: InputMaybe<Scalars['Int']['input']>
  number_gte?: InputMaybe<Scalars['Int']['input']>
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Perk = {
  __typename?: 'Perk'
  cooldown: Scalars['BigInt']['output']
  expiration: Scalars['BigInt']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  price: Scalars['BigInt']['output']
  role: Scalars['String']['output']
}

export type PerkOwnership = {
  __typename?: 'PerkOwnership'
  id: Scalars['ID']['output']
  owner: User
  perk: Perk
}

export type PerkOwnership_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<PerkOwnership_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<PerkOwnership_Filter>>>
  owner?: InputMaybe<Scalars['String']['input']>
  owner_?: InputMaybe<User_Filter>
  owner_contains?: InputMaybe<Scalars['String']['input']>
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>
  owner_ends_with?: InputMaybe<Scalars['String']['input']>
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  owner_gt?: InputMaybe<Scalars['String']['input']>
  owner_gte?: InputMaybe<Scalars['String']['input']>
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>
  owner_lt?: InputMaybe<Scalars['String']['input']>
  owner_lte?: InputMaybe<Scalars['String']['input']>
  owner_not?: InputMaybe<Scalars['String']['input']>
  owner_not_contains?: InputMaybe<Scalars['String']['input']>
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  owner_starts_with?: InputMaybe<Scalars['String']['input']>
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  perk?: InputMaybe<Scalars['String']['input']>
  perk_?: InputMaybe<Perk_Filter>
  perk_contains?: InputMaybe<Scalars['String']['input']>
  perk_contains_nocase?: InputMaybe<Scalars['String']['input']>
  perk_ends_with?: InputMaybe<Scalars['String']['input']>
  perk_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  perk_gt?: InputMaybe<Scalars['String']['input']>
  perk_gte?: InputMaybe<Scalars['String']['input']>
  perk_in?: InputMaybe<Array<Scalars['String']['input']>>
  perk_lt?: InputMaybe<Scalars['String']['input']>
  perk_lte?: InputMaybe<Scalars['String']['input']>
  perk_not?: InputMaybe<Scalars['String']['input']>
  perk_not_contains?: InputMaybe<Scalars['String']['input']>
  perk_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  perk_not_ends_with?: InputMaybe<Scalars['String']['input']>
  perk_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  perk_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  perk_not_starts_with?: InputMaybe<Scalars['String']['input']>
  perk_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  perk_starts_with?: InputMaybe<Scalars['String']['input']>
  perk_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum PerkOwnership_OrderBy {
  Id = 'id',
  Owner = 'owner',
  OwnerHolders = 'owner__holders',
  OwnerHoldings = 'owner__holdings',
  OwnerId = 'owner__id',
  Perk = 'perk',
  PerkCooldown = 'perk__cooldown',
  PerkExpiration = 'perk__expiration',
  PerkId = 'perk__id',
  PerkName = 'perk__name',
  PerkPrice = 'perk__price',
  PerkRole = 'perk__role',
}

export type Perk_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Perk_Filter>>>
  cooldown?: InputMaybe<Scalars['BigInt']['input']>
  cooldown_gt?: InputMaybe<Scalars['BigInt']['input']>
  cooldown_gte?: InputMaybe<Scalars['BigInt']['input']>
  cooldown_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  cooldown_lt?: InputMaybe<Scalars['BigInt']['input']>
  cooldown_lte?: InputMaybe<Scalars['BigInt']['input']>
  cooldown_not?: InputMaybe<Scalars['BigInt']['input']>
  cooldown_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  expiration?: InputMaybe<Scalars['BigInt']['input']>
  expiration_gt?: InputMaybe<Scalars['BigInt']['input']>
  expiration_gte?: InputMaybe<Scalars['BigInt']['input']>
  expiration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  expiration_lt?: InputMaybe<Scalars['BigInt']['input']>
  expiration_lte?: InputMaybe<Scalars['BigInt']['input']>
  expiration_not?: InputMaybe<Scalars['BigInt']['input']>
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_ends_with?: InputMaybe<Scalars['String']['input']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_gt?: InputMaybe<Scalars['String']['input']>
  name_gte?: InputMaybe<Scalars['String']['input']>
  name_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_lt?: InputMaybe<Scalars['String']['input']>
  name_lte?: InputMaybe<Scalars['String']['input']>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_starts_with?: InputMaybe<Scalars['String']['input']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  or?: InputMaybe<Array<InputMaybe<Perk_Filter>>>
  price?: InputMaybe<Scalars['BigInt']['input']>
  price_gt?: InputMaybe<Scalars['BigInt']['input']>
  price_gte?: InputMaybe<Scalars['BigInt']['input']>
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  price_lt?: InputMaybe<Scalars['BigInt']['input']>
  price_lte?: InputMaybe<Scalars['BigInt']['input']>
  price_not?: InputMaybe<Scalars['BigInt']['input']>
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  role?: InputMaybe<Scalars['String']['input']>
  role_contains?: InputMaybe<Scalars['String']['input']>
  role_contains_nocase?: InputMaybe<Scalars['String']['input']>
  role_ends_with?: InputMaybe<Scalars['String']['input']>
  role_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  role_gt?: InputMaybe<Scalars['String']['input']>
  role_gte?: InputMaybe<Scalars['String']['input']>
  role_in?: InputMaybe<Array<Scalars['String']['input']>>
  role_lt?: InputMaybe<Scalars['String']['input']>
  role_lte?: InputMaybe<Scalars['String']['input']>
  role_not?: InputMaybe<Scalars['String']['input']>
  role_not_contains?: InputMaybe<Scalars['String']['input']>
  role_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  role_not_ends_with?: InputMaybe<Scalars['String']['input']>
  role_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  role_not_starts_with?: InputMaybe<Scalars['String']['input']>
  role_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  role_starts_with?: InputMaybe<Scalars['String']['input']>
  role_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum Perk_OrderBy {
  Cooldown = 'cooldown',
  Expiration = 'expiration',
  Id = 'id',
  Name = 'name',
  Price = 'price',
  Role = 'role',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  perk?: Maybe<Perk>
  perkOwnership?: Maybe<PerkOwnership>
  perkOwnerships: Array<PerkOwnership>
  perks: Array<Perk>
  role?: Maybe<Role>
  roles: Array<Role>
  token?: Maybe<Token>
  tokenOwnership?: Maybe<TokenOwnership>
  tokenOwnerships: Array<TokenOwnership>
  tokens: Array<Token>
  user?: Maybe<User>
  users: Array<User>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryPerkArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPerkOwnershipArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPerkOwnershipsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PerkOwnership_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<PerkOwnership_Filter>
}

export type QueryPerksArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Perk_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Perk_Filter>
}

export type QueryRoleArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRolesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Role_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Role_Filter>
}

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenOwnershipArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenOwnershipsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TokenOwnership_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TokenOwnership_Filter>
}

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
}

export type Role = {
  __typename?: 'Role'
  id: Scalars['ID']['output']
}

export type Role_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Role_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Role_Filter>>>
}

export enum Role_OrderBy {
  Id = 'id',
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  perk?: Maybe<Perk>
  perkOwnership?: Maybe<PerkOwnership>
  perkOwnerships: Array<PerkOwnership>
  perks: Array<Perk>
  role?: Maybe<Role>
  roles: Array<Role>
  token?: Maybe<Token>
  tokenOwnership?: Maybe<TokenOwnership>
  tokenOwnerships: Array<TokenOwnership>
  tokens: Array<Token>
  user?: Maybe<User>
  users: Array<User>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionPerkArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPerkOwnershipArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPerkOwnershipsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PerkOwnership_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<PerkOwnership_Filter>
}

export type SubscriptionPerksArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Perk_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Perk_Filter>
}

export type SubscriptionRoleArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRolesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Role_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Role_Filter>
}

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenOwnershipArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenOwnershipsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TokenOwnership_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TokenOwnership_Filter>
}

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
}

export type Token = {
  __typename?: 'Token'
  address: Scalars['String']['output']
  id: Scalars['ID']['output']
  supply: Scalars['BigInt']['output']
}

export type TokenOwnership = {
  __typename?: 'TokenOwnership'
  amount: Scalars['BigInt']['output']
  id: Scalars['ID']['output']
  owner: User
  subject: Token
}

export type TokenOwnership_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']['input']>
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>
  amount_not?: InputMaybe<Scalars['BigInt']['input']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  and?: InputMaybe<Array<InputMaybe<TokenOwnership_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<TokenOwnership_Filter>>>
  owner?: InputMaybe<Scalars['String']['input']>
  owner_?: InputMaybe<User_Filter>
  owner_contains?: InputMaybe<Scalars['String']['input']>
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>
  owner_ends_with?: InputMaybe<Scalars['String']['input']>
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  owner_gt?: InputMaybe<Scalars['String']['input']>
  owner_gte?: InputMaybe<Scalars['String']['input']>
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>
  owner_lt?: InputMaybe<Scalars['String']['input']>
  owner_lte?: InputMaybe<Scalars['String']['input']>
  owner_not?: InputMaybe<Scalars['String']['input']>
  owner_not_contains?: InputMaybe<Scalars['String']['input']>
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  owner_starts_with?: InputMaybe<Scalars['String']['input']>
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  subject?: InputMaybe<Scalars['String']['input']>
  subject_?: InputMaybe<Token_Filter>
  subject_contains?: InputMaybe<Scalars['String']['input']>
  subject_contains_nocase?: InputMaybe<Scalars['String']['input']>
  subject_ends_with?: InputMaybe<Scalars['String']['input']>
  subject_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  subject_gt?: InputMaybe<Scalars['String']['input']>
  subject_gte?: InputMaybe<Scalars['String']['input']>
  subject_in?: InputMaybe<Array<Scalars['String']['input']>>
  subject_lt?: InputMaybe<Scalars['String']['input']>
  subject_lte?: InputMaybe<Scalars['String']['input']>
  subject_not?: InputMaybe<Scalars['String']['input']>
  subject_not_contains?: InputMaybe<Scalars['String']['input']>
  subject_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  subject_not_ends_with?: InputMaybe<Scalars['String']['input']>
  subject_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  subject_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  subject_not_starts_with?: InputMaybe<Scalars['String']['input']>
  subject_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  subject_starts_with?: InputMaybe<Scalars['String']['input']>
  subject_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum TokenOwnership_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Owner = 'owner',
  OwnerHolders = 'owner__holders',
  OwnerHoldings = 'owner__holdings',
  OwnerId = 'owner__id',
  Subject = 'subject',
  SubjectAddress = 'subject__address',
  SubjectId = 'subject__id',
  SubjectSupply = 'subject__supply',
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['String']['input']>
  address_contains?: InputMaybe<Scalars['String']['input']>
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_ends_with?: InputMaybe<Scalars['String']['input']>
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_gt?: InputMaybe<Scalars['String']['input']>
  address_gte?: InputMaybe<Scalars['String']['input']>
  address_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_lt?: InputMaybe<Scalars['String']['input']>
  address_lte?: InputMaybe<Scalars['String']['input']>
  address_not?: InputMaybe<Scalars['String']['input']>
  address_not_contains?: InputMaybe<Scalars['String']['input']>
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_starts_with?: InputMaybe<Scalars['String']['input']>
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  supply?: InputMaybe<Scalars['BigInt']['input']>
  supply_gt?: InputMaybe<Scalars['BigInt']['input']>
  supply_gte?: InputMaybe<Scalars['BigInt']['input']>
  supply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  supply_lt?: InputMaybe<Scalars['BigInt']['input']>
  supply_lte?: InputMaybe<Scalars['BigInt']['input']>
  supply_not?: InputMaybe<Scalars['BigInt']['input']>
  supply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export enum Token_OrderBy {
  Address = 'address',
  Id = 'id',
  Supply = 'supply',
}

export type User = {
  __typename?: 'User'
  holders: Scalars['BigInt']['output']
  holdings: Scalars['BigInt']['output']
  id: Scalars['ID']['output']
  perks: Array<PerkOwnership>
  role?: Maybe<Role>
  token: Token
}

export type UserPerksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PerkOwnership_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PerkOwnership_Filter>
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>
  holders?: InputMaybe<Scalars['BigInt']['input']>
  holders_gt?: InputMaybe<Scalars['BigInt']['input']>
  holders_gte?: InputMaybe<Scalars['BigInt']['input']>
  holders_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  holders_lt?: InputMaybe<Scalars['BigInt']['input']>
  holders_lte?: InputMaybe<Scalars['BigInt']['input']>
  holders_not?: InputMaybe<Scalars['BigInt']['input']>
  holders_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  holdings?: InputMaybe<Scalars['BigInt']['input']>
  holdings_gt?: InputMaybe<Scalars['BigInt']['input']>
  holdings_gte?: InputMaybe<Scalars['BigInt']['input']>
  holdings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  holdings_lt?: InputMaybe<Scalars['BigInt']['input']>
  holdings_lte?: InputMaybe<Scalars['BigInt']['input']>
  holdings_not?: InputMaybe<Scalars['BigInt']['input']>
  holdings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>
  perks_?: InputMaybe<PerkOwnership_Filter>
  role?: InputMaybe<Scalars['String']['input']>
  role_?: InputMaybe<Role_Filter>
  role_contains?: InputMaybe<Scalars['String']['input']>
  role_contains_nocase?: InputMaybe<Scalars['String']['input']>
  role_ends_with?: InputMaybe<Scalars['String']['input']>
  role_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  role_gt?: InputMaybe<Scalars['String']['input']>
  role_gte?: InputMaybe<Scalars['String']['input']>
  role_in?: InputMaybe<Array<Scalars['String']['input']>>
  role_lt?: InputMaybe<Scalars['String']['input']>
  role_lte?: InputMaybe<Scalars['String']['input']>
  role_not?: InputMaybe<Scalars['String']['input']>
  role_not_contains?: InputMaybe<Scalars['String']['input']>
  role_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  role_not_ends_with?: InputMaybe<Scalars['String']['input']>
  role_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  role_not_starts_with?: InputMaybe<Scalars['String']['input']>
  role_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  role_starts_with?: InputMaybe<Scalars['String']['input']>
  role_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
  token_?: InputMaybe<Token_Filter>
  token_contains?: InputMaybe<Scalars['String']['input']>
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_ends_with?: InputMaybe<Scalars['String']['input']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_gt?: InputMaybe<Scalars['String']['input']>
  token_gte?: InputMaybe<Scalars['String']['input']>
  token_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_lt?: InputMaybe<Scalars['String']['input']>
  token_lte?: InputMaybe<Scalars['String']['input']>
  token_not?: InputMaybe<Scalars['String']['input']>
  token_not_contains?: InputMaybe<Scalars['String']['input']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_starts_with?: InputMaybe<Scalars['String']['input']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export enum User_OrderBy {
  Holders = 'holders',
  Holdings = 'holdings',
  Id = 'id',
  Perks = 'perks',
  Role = 'role',
  RoleId = 'role__id',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenId = 'token__id',
  TokenSupply = 'token__supply',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>
  /** The block number */
  number: Scalars['Int']['output']
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']['output']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetHoldingHoldersCountQueryVariables = Exact<{
  walletAddress: Scalars['ID']['input']
}>

export type GetHoldingHoldersCountQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; holdings: any; holders: any } | null
}

export type GetTokenHoldersQueryVariables = Exact<{
  walletAddress: Scalars['String']['input']
  limit: Scalars['Int']['input']
  offset: Scalars['Int']['input']
}>

export type GetTokenHoldersQuery = {
  __typename?: 'Query'
  tokenOwnerships: Array<{
    __typename?: 'TokenOwnership'
    id: string
    owner: {
      __typename?: 'User'
      id: string
      perks: Array<{
        __typename?: 'PerkOwnership'
        id: string
        perk: { __typename?: 'Perk'; expiration: any; id: string; price: any }
      }>
      role?: { __typename?: 'Role'; id: string } | null
      token: { __typename?: 'Token'; address: string; id: string; supply: any }
    }
  }>
}

export type GetTokenHoldingsQueryVariables = Exact<{
  walletAddress: Scalars['String']['input']
  limit: Scalars['Int']['input']
  offset: Scalars['Int']['input']
}>

export type GetTokenHoldingsQuery = {
  __typename?: 'Query'
  tokenOwnerships: Array<{
    __typename?: 'TokenOwnership'
    id: string
    owner: {
      __typename?: 'User'
      id: string
      perks: Array<{
        __typename?: 'PerkOwnership'
        id: string
        perk: { __typename?: 'Perk'; expiration: any; id: string; price: any }
      }>
      role?: { __typename?: 'Role'; id: string } | null
      token: { __typename?: 'Token'; address: string; id: string; supply: any }
    }
  }>
}

export type GetTokenQueryVariables = Exact<{
  walletAddress: Scalars['ID']['input']
}>

export type GetTokenQuery = {
  __typename?: 'Query'
  token?: { __typename?: 'Token'; id: string; supply: any } | null
}

export type GetUserQueryVariables = Exact<{
  walletAddress: Scalars['ID']['input']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    perks: Array<{
      __typename?: 'PerkOwnership'
      id: string
      perk: { __typename?: 'Perk'; id: string; expiration: any; name: string }
    }>
    role?: { __typename?: 'Role'; id: string } | null
  } | null
}

export type GetUsersByOmittingRoleQueryVariables = Exact<{
  role: Scalars['ID']['input']
}>

export type GetUsersByOmittingRoleQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    perks: Array<{
      __typename?: 'PerkOwnership'
      id: string
      perk: { __typename?: 'Perk'; id: string; expiration: any; name: string }
    }>
    role?: { __typename?: 'Role'; id: string } | null
  }>
}

export type GetUsersByRoleQueryVariables = Exact<{
  role: Scalars['ID']['input']
}>

export type GetUsersByRoleQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    perks: Array<{
      __typename?: 'PerkOwnership'
      id: string
      perk: { __typename?: 'Perk'; id: string; expiration: any; name: string }
    }>
    role?: { __typename?: 'Role'; id: string } | null
  }>
}

export type GetUsersWithRoleSetQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersWithRoleSetQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    perks: Array<{
      __typename?: 'PerkOwnership'
      id: string
      perk: { __typename?: 'Perk'; id: string; expiration: any; name: string }
    }>
    role?: { __typename?: 'Role'; id: string } | null
  }>
}

export type GetUsersWithoutRoleSetQueryVariables = Exact<{
  [key: string]: never
}>

export type GetUsersWithoutRoleSetQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    perks: Array<{
      __typename?: 'PerkOwnership'
      id: string
      perk: { __typename?: 'Perk'; id: string; expiration: any; name: string }
    }>
    role?: { __typename?: 'Role'; id: string } | null
  }>
}

export const GetHoldingHoldersCountDocument = gql`
  query GetHoldingHoldersCount($walletAddress: ID!) {
    user(id: $walletAddress) {
      holdings
      holders
    }
  }
`
export const GetTokenHoldersDocument = gql`
  query GetTokenHolders($walletAddress: String!, $limit: Int!, $offset: Int!) {
    tokenOwnerships(
      where: { subject: $walletAddress }
      first: $limit
      skip: $offset
    ) {
      id
      owner {
        id
        perks {
          id
          perk {
            expiration
            id
            price
          }
        }
        role {
          id
        }
        token {
          address
          id
          supply
        }
      }
    }
  }
`
export const GetTokenHoldingsDocument = gql`
  query GetTokenHoldings($walletAddress: String!, $limit: Int!, $offset: Int!) {
    tokenOwnerships(
      where: { owner: $walletAddress }
      first: $limit
      skip: $offset
    ) {
      id
      owner {
        id
        perks {
          id
          perk {
            expiration
            id
            price
          }
        }
        role {
          id
        }
        token {
          address
          id
          supply
        }
      }
    }
  }
`
export const GetTokenDocument = gql`
  query GetToken($walletAddress: ID!) {
    token(id: $walletAddress) {
      id
      supply
    }
  }
`
export const GetUserDocument = gql`
  query GetUser($walletAddress: ID!) {
    user(id: $walletAddress) {
      id
      perks {
        id
        perk {
          id
          expiration
          name
        }
      }
      role {
        id
      }
    }
  }
`
export const GetUsersByOmittingRoleDocument = gql`
  query GetUsersByOmittingRole($role: ID!) {
    users(where: { role_: { id_not_in: [$role] } }) {
      id
      perks {
        id
        perk {
          id
          expiration
          name
        }
      }
      role {
        id
      }
    }
  }
`
export const GetUsersByRoleDocument = gql`
  query GetUsersByRole($role: ID!) {
    users(where: { role_: { id: $role } }) {
      id
      perks {
        id
        perk {
          id
          expiration
          name
        }
      }
      role {
        id
      }
    }
  }
`
export const GetUsersWithRoleSetDocument = gql`
  query GetUsersWithRoleSet {
    users(where: { role_not: null }) {
      id
      perks {
        id
        perk {
          id
          expiration
          name
        }
      }
      role {
        id
      }
    }
  }
`
export const GetUsersWithoutRoleSetDocument = gql`
  query GetUsersWithoutRoleSet {
    users(where: { role: null }) {
      id
      perks {
        id
        perk {
          id
          expiration
          name
        }
      }
      role {
        id
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetHoldingHoldersCount(
      variables: GetHoldingHoldersCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetHoldingHoldersCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetHoldingHoldersCountQuery>(
            GetHoldingHoldersCountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetHoldingHoldersCount',
        'query',
        variables,
      )
    },
    GetTokenHolders(
      variables: GetTokenHoldersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetTokenHoldersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTokenHoldersQuery>(
            GetTokenHoldersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetTokenHolders',
        'query',
        variables,
      )
    },
    GetTokenHoldings(
      variables: GetTokenHoldingsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetTokenHoldingsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTokenHoldingsQuery>(
            GetTokenHoldingsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetTokenHoldings',
        'query',
        variables,
      )
    },
    GetToken(
      variables: GetTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTokenQuery>(GetTokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetToken',
        'query',
        variables,
      )
    },
    GetUser(
      variables: GetUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUser',
        'query',
        variables,
      )
    },
    GetUsersByOmittingRole(
      variables: GetUsersByOmittingRoleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUsersByOmittingRoleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersByOmittingRoleQuery>(
            GetUsersByOmittingRoleDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUsersByOmittingRole',
        'query',
        variables,
      )
    },
    GetUsersByRole(
      variables: GetUsersByRoleQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUsersByRoleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersByRoleQuery>(
            GetUsersByRoleDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUsersByRole',
        'query',
        variables,
      )
    },
    GetUsersWithRoleSet(
      variables?: GetUsersWithRoleSetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUsersWithRoleSetQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersWithRoleSetQuery>(
            GetUsersWithRoleSetDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUsersWithRoleSet',
        'query',
        variables,
      )
    },
    GetUsersWithoutRoleSet(
      variables?: GetUsersWithoutRoleSetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUsersWithoutRoleSetQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersWithoutRoleSetQuery>(
            GetUsersWithoutRoleSetDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetUsersWithoutRoleSet',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
