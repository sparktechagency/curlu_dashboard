import { baseApi } from "../baseApi";

const salonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSalon: builder.query({
            query: ({ page, location }) => ({
                url: 'all-salon',
                method: 'GET',
                params: { page, location },
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
    })
});

export const {
    useGetSalonQuery,
    useCreateSalonMutation,
    useGetSalonServicesQuery,
    useUpdateSalonServiceStatusMutation
} = salonApi;
