const { apiSlice } = require("./apiSlice");

const patchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggleComplete: builder.mutation({
      query: ({ id, completed }) => {
        const currentTime = new Date().toISOString();
        return {
          url: `/next-rtk-crud/${id}`,
          method: "PATCH",
          body: {
            completed,
            completedAt: completed ? currentTime : null,
          },
        };
      },
      invalidatesTags: ["GetPosts"],

      // Optimistic update
      async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
        const currentTime = new Date().toISOString();
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) {
              post.completed = completed;
              post.completedAt = completed ? currentTime : null;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Revert on error
        }
      },
    }),
  }),
});

export const { useToggleCompleteMutation } = patchApiSlice;
