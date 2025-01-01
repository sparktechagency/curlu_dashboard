import { baseApi } from "../baseApi";

const transitionApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransition: builder.query({
            query: (params) => {
                const { search, status } = params;
                return {
                    url: `/order_transaction`,
                    params: { search, status },
                };
            },
        }),
        getSalonInvoice: builder.query({
            query: (params) => {
                const { search } = params;
                return {
                    url: `/salon_invoice`,
                    params: { search },
                };
            },
        }),
    }),
});

export const { useGetTransitionQuery, useGetSalonInvoiceQuery } = transitionApis;
