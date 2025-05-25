import { baseApi } from '../baseApi';

const transitionApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransition: builder.query({
      query: (params) => {
        const { search, status, booking_date } = params;
        return {
          url: `/order_transaction`,
          params: { search, status, booking_date },
        };
      },
    }),

    getSalonInvoice: builder.query({
      query: (params) => {
        const { search, date } = params;
        return {
          url: `/salon_invoice`,
          params: { search, date },
        };
      },
    }),
  }),
});

export const { useGetTransitionQuery, useGetSalonInvoiceQuery } =
  transitionApis;
