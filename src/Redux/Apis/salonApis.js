import { baseApi } from "../baseApi";

const adminsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all admins
        getAdmins: builder.query({
            query: ({ page }) => ({
                url: 'admins',
                method: 'GET',
                params: { page }
            }),
            providesTags: ['Admin'], // Provides tags for cache invalidation
        }),

        // POST create new admin
        createAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: 'admins',
                method: 'POST',
                body: newAdmin
            }),
            invalidatesTags: ['Admin'], // Invalidate cache to refetch data
        }),

        // PATCH update existing admin by ID
        updateAdmin: builder.mutation({
            query: ({ id, updatedAdmin }) => ({
                url: `admins/${id}`,
                method: 'PATCH',
                body: updatedAdmin
            }),
            invalidatesTags: ['Admin'], // Invalidate cache to refetch data
        }),

        // DELETE an admin by ID
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `admins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admin'], // Invalidate cache to refetch data
        }),
    })
});

export const {
    useGetAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = adminsApi;
