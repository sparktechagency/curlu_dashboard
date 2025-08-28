import { baseApi } from "../baseApi";

const manageEshopApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, per_page }) => ({
        url: "/products",
        method: "GET",
        params: { page, per_page },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")) || ""
          }`,
        },
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")) || ""
          }`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")) || ""
          }`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")) || ""
          }`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = manageEshopApis;
