//all-salon
import { baseApi } from "../baseApi";

const salonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSalon: builder.query({
            query: ({ page, }) => {
                return {
                    url: 'all-salon',
                    method: 'GET',
                    params: { page, }
                };
            },
            providesTags: ['salon'],
        }),
    })
});

export const {
    useGetSalonQuery
} = salonApi;
