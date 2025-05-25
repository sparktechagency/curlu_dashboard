import { baseApi } from "../baseApi";

const shopCategory = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createShopCategory: builder.mutation({
            query: (data) => {
                return {
                    url: 'shop-category',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['ShopCategory'],
        }),
        getShopCategories: builder.query({
            query: ({ page }) => {
                return {
                    url: 'shop-category',
                    method: 'GET',
                    params: { page }
                };
            },
            providesTags: ['ShopCategory'],
        }),
        updateShopCategory: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `shop-category/${id}`,
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['ShopCategory'],
        }),
        deleteShopCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `shop-category/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                };
            },
            invalidatesTags: ['ShopCategory'],
        }),
    })
});

export const {
    useCreateShopCategoryMutation,
    useGetShopCategoriesQuery,
    useUpdateShopCategoryMutation,
    useDeleteShopCategoryMutation
} = shopCategory;
