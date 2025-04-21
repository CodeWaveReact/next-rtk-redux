const { apiSlice } = require("./apiSlice");

const deleteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/next-rtk-crud/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetPosts"],

      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically remove post from cache
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            return draft.filter((post) => post.id !== id);
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

export const { useDeletePostMutation } = deleteApiSlice;
