const { apiSlice } = require("./apiSlice");

const putApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updatePost: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/next-rtk-crud/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["GetPosts"],

      // Optimistic update
      async onQueryStarted({ id, ...updates }, { dispatch, queryFulfilled }) {
        // Optimistically update the post in cache
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) {
              Object.assign(post, updates);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Revert if request fails
        }
      },
    }),
  }),
});

export const { useUpdatePostMutation } = putApiSlice;
