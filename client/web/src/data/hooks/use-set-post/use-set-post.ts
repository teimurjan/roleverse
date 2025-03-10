import { InfiniteData, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import {
  ExploreQuery,
  FeedQuery,
  Post_Fragment,
  PostQuery,
  PostsQuery,
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

    queryClient.setQueryData<InfiniteData<PostsQuery>>(
      [QueryKey.Posts],
      (data) => {
        if (data) {
          return {
            ...data,
            pages: data.pages.map((page) => ({
              posts: page.posts.map((post) =>
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
