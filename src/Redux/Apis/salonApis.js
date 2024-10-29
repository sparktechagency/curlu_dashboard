//all-salon
import { baseApi } from "../baseApi";

const salonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSalon: builder.query({
            query: ({ page, location }) => {
                return {
                    url: 'all-salon',
                    method: 'GET',
                    params: { page, location }
                };
            },
            providesTags: ['salon'],
        }),
        createSalon: builder.mutation({
            query: (data) => {
                return {
                    url: 'add-salon',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['salon'],
        }),
        getSalonServices: builder.query({
            query: ({ user_name, address, salon_type, service_status, price_min, price_max, page }) => {
                return {
                    url: 'salon-services',
                    method: 'GET',
                    params: {
                        user_name,
                        address,
                        salon_type,
                        service_status,
                        price_min,
                        price_max,
                        page
                    }
                };
            },
            providesTags: ['salonService'],
        }),
    })
});

export const {
    useGetSalonQuery,
    useCreateSalonMutation,
    useGetSalonServicesQuery
} = salonApi;
