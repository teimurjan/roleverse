import { InfiniteData, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import {
  ExploreQuery,
  FeedQuery,
  LikedPostsQuery,
  Post_Fragment,
  PostQuery,
  UserPostsQuery,
} from "@/data/generated/get-sdk";

const useSetPost = () => {
  const queryClient = useQueryClient();

  return (postId: string, setter: (post: Post_Fragment) => Post_Fragment) => {
    queryClient.setQueryData<InfiniteData<FeedQuery>>(
      [QueryKey.Feed],
      (data) => {
        if (data) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              feed: page.feed.map((post) =>
                post.id === postId ? setter(post) : post
              ),
            })),
          };
        }
      }
    );

    queryClient.setQueryData<InfiniteData<ExploreQuery>>(
      [QueryKey.Explore],
      (data) => {
        if (data) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              explore: page.explore.map((post) =>
                post.id === postId ? setter(post) : post
              ),
            })),
          };
        }
      }
    );

    queryClient.setQueriesData<InfiniteData<UserPostsQuery>>(
      { queryKey: [QueryKey.UserPosts] },
      (data) => {
        if (data) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              userPosts: page.userPosts.map((post) =>
                post.id === postId ? setter(post) : post
              ),
            })),
          };
        }
      }
    );

    queryClient.setQueryData<InfiniteData<LikedPostsQuery>>(
      [QueryKey.LikedPosts],
      (data) => {
        if (data) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              likedPosts: page.likedPosts.map((post) =>
                post.id === postId ? setter(post) : post
              ),
            })),
          };
        }
      }
    );

    queryClient.setQueryData<PostQuery>([QueryKey.Post, postId], (data) => {
      if (data) {
        return {
          ...data,
          post: setter(data.post),
        };
      }
    });
  };
};

export default useSetPost;
