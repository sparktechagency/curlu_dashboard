import { baseApi } from "../baseApi";

const salonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSalon: builder.query({
            query: ({ page, location, per_page }) => ({
                url: 'all-salon',
                method: 'GET',
                params: { page, search:location, per_page },
            }),
            providesTags: ['salon'],
        }),
        createSalon: builder.mutation({
            query: (data) => ({
                url: 'add-salon',
                method: 'POST',
                body: data,
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                }
            }),
            invalidatesTags: ['salon'],
        }),
        getSalonServices: builder.query({
            query: ({ user_name, address, category_id, service_status, price_min, price_max, page }) => ({
                url: 'salon-services',
                method: 'GET',
                params: {
                    address,
                    category_id,
                    service_status,
                    user_name,
                    page
                }
            }),
            providesTags: ['salonService'],
        }),
        updateSalonServiceStatus: builder.mutation({
            query: ({ id, active }) => ({
                url: `salon-services-active/${id}`,
                method: 'PATCH',
                body: { active }
            }),
            invalidatesTags: ['salonService'],
        }),
        blockUnblock: builder.mutation({
            query: (id) => {
                return {
                    url: `salon-status/${id}`,
                    method: 'PUT',
                };
            },
            invalidatesTags: ['salon'],
        }),
    })
});

export const {
    useGetSalonQuery,
    useCreateSalonMutation,
    useGetSalonServicesQuery,
    useUpdateSalonServiceStatusMutation,
    useBlockUnblockMutation
} = salonApi;
