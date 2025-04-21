const { apiSlice } = require("./apiSlice");

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/next-rtk-crud",
        method: "POST",
        body: { ...newPost, completed: false },
      }),
      invalidatesTags: ["GetPosts"],

      // Optimistic update
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        // Update the getPosts cache optimistically
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.unshift({
              ...newPost,
              id: Date.now(), // Temporary ID, replace when server responds
              completed: false,
            });
          })
        );

        try {
          // Await the server response to finalize update
          await queryFulfilled;
        } catch {
          // Rollback if the request fails
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreatePostMutation } = postApiSlice;
