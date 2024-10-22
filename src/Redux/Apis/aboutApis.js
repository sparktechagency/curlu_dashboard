import { baseApi } from "../baseApi";
const aboutUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addAboutUs: builder.mutation({
            query: (data) => {
                ;
                return {
                    url: 'about-us/1',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""}`,
                    }
                };
            },
            invalidatesTags: ['aboutUs'],
        }),
        getAboutUs: builder.query({
            query: () => `/about-us`,
            providesTags: ['aboutUs']
        }),
        addPrivacy: builder.mutation({
            query: (data) => {
                ;
                return {
                    url: 'privacy-policy/1',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""}`,
                    }
                };
            },
            invalidatesTags: ['privacy'],
        }),
        getPrivacy: builder.query({
            query: () => `privacy-policy`,
            providesTags: ['privacy']
        }),
        addTerms: builder.mutation({
            query: (data) => {
                ;
                return {
                    url: 'terms-condition/1',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""}`,
                    }
                };
            },
            invalidatesTags: ['terms'],
        }),
        getTerms: builder.query({
            query: () => `terms-condition`,
            providesTags: ['terms']
        }),
        addFaq: builder.mutation({
            query: (data) => {
                ;
                return {
                    url: 'faqs',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""}`,
                    }
                };
            },
            invalidatesTags: ['faq'],
        }),
        getFaqs: builder.query({
            query: ({ page }) => ({ url: `faqs`, method: 'GET', params: { page } }),
            providesTags: ['faq']
        }),
        deleteFaqs: builder.mutation({
            query: (id) => ({ url: `faqs/${id}`, method: 'DELETE' }),
            invalidatesTags: ['faq']
        }),
    }),
});

export const {
    useAddAboutUsMutation,
    useGetAboutUsQuery,
    useAddPrivacyMutation,
    useGetPrivacyQuery,
    useGetTermsQuery,
    useAddTermsMutation,
    useAddFaqMutation,
    useGetFaqsQuery,
    useDeleteFaqsMutation
} = aboutUsApi;
