import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => {
                return {
                    url: 'categories',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['Category'],
        }),
        getCategories: builder.query({
            query: ({ page,per_page }) => {
                return {
                    url: 'categories',
                    method: 'GET',
                    params: { page,per_page }
                };
            },
            providesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `categories/${id}`,
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `categories/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['Category'],
        }),
    })
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
