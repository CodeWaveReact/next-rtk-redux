import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token"); // Take Token from Local Storage
};

export const apiSlice = createApi({
  reducerPath: "postsApi",
  // refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://680677fce81df7060eb740b6.mockapi.io/api/v2",
    prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["GetPosts"],

  // Get api endpoints
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/next-rtk-crud",
      transformResponse: (response) => response.reverse(),
      providesTags: ["GetPosts"],
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = apiSlice;

// refetchOnFocus:true - If the user minimizes the tab or window and then refocuses, the API will automatically fetch the data again.
// refetchOnReconnect:true- If the network connection is lost and then reconnected, the API call will be made again.
// refetchOnMountOrArgChange:true - It determines whether the data should be fetched again when the component remounts (such as on a page refresh) or when the arguments for the API call change.
