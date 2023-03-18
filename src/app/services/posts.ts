import { api } from "./api";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type PostsResponse = Post[];

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, { start: number; limit: number }>({
      query: (options) => ({
        url: `/posts?_start=${options?.start || 0}&_limit=${
          options?.limit || 5
        }`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Posts", id } as const)),
        { type: "Posts" as const, id: "LIST" },
      ],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_post, _err, id) => [{ type: "Posts", id }],
    }),
    updatePost: build.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `posts/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (post) => [{ type: "Posts", id: post?.id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (post) => [{ type: "Posts", id: post?.id }],
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone",
    }),
  }),
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useGetErrorProneQuery,
} = postsApi;

export const {
  endpoints: { getPost },
} = postsApi;
