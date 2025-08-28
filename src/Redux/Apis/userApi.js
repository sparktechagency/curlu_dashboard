import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ page, search, per_page }) => {
        return {
          url: "/user-details",
          method: "GET",
          params: { page, search, per_page },
        };
      },
      providesTags: ["user"],
    }),
    blockUnblock: builder.mutation({
      query: (id) => {
        return {
          url: `user-status/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery, useBlockUnblockMutation } = userApi;
