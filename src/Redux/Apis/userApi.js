import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ page, location }) => {
                return {
                    url: 'user-details',
                    method: 'GET',
                    params: { page, location }
                };
            },
            providesTags: ['user'],
        }),

    })
});

export const {
    useGetUserQuery
} = userApi;
