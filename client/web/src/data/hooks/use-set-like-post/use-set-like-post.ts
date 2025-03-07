import { InfiniteData, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { ExploreQuery, FeedQuery, PostsQuery } from "@/data/generated/get-sdk";
import { useAuth } from "@/providers/auth";

const useSetLikePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return (postId: string) => {
    queryClient.setQueryData<InfiniteData<FeedQuery>>(
      [QueryKey.Feed],
      (data) => {
        if (data && user) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              feed: page.feed.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likes: [...(post.likes || []), user.me],
                    }
                  : post
              ),
            })),
          };
        }
      }
    );

    queryClient.setQueryData<InfiniteData<ExploreQuery>>(
      [QueryKey.Explore],
      (data) => {
        if (data && user) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              explore: page.explore.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likes: [...(post.likes || []), user.me],
                    }
                  : post
              ),
            })),
          };
        }
      }
    );

    queryClient.setQueryData<InfiniteData<PostsQuery>>(
      [QueryKey.Posts],
      (data) => {
        if (data && user) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              posts: page.posts.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likes: [...(post.likes || []), user.me],
                    }
                  : post
              ),
            })),
          };
        }
      }
    );
  };
};

export default useSetLikePost;
