import { InfiniteData, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { ExploreQuery, FeedQuery, PostsQuery } from "@/data/generated/get-sdk";
import { useAuth } from "@/providers/auth";

const useSetUnlikePost = () => {
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
                      likes: post?.likes?.filter(
                        (like) => like.id !== user.me.id
                      ),
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
                      likes: post?.likes?.filter(
                        (like) => like.id !== user.me.id
                      ),
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
                      likes: post?.likes?.filter(
                        (like) => like.id !== user.me.id
                      ),
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

export default useSetUnlikePost;
