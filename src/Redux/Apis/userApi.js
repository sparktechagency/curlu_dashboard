import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ page, location }) => {
                return {
                    url: '/user-details',
                    method: 'GET',
                    params: { page, location }
                };
            },
            providesTags: ['user'],
        }),
        blockUnblock: builder.mutation({
            query: (id) => {
                return {
                    url: `user-status/${id}`,
                    method: 'PUT',
                };
            },
            invalidatesTags: ['user'],
        }),

    })
});

export const {
    useGetUserQuery,
    useBlockUnblockMutation
} = userApi;
