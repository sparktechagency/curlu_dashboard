import { baseApi } from '../baseApi';

const feedbackApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: ({ page, date, salon_id, per_page }) => ({
        url: '/feedback',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')) || ''
          }`,
        },
        params: { page, date, salon_id, per_page },
      }),
      providesTags: ['feedback'],
    }),
    getSalonList: builder.query({
      query: () => ({
        url: '/get-all-salon',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')) || ''
          }`,
        },
      }),
    }),
    updateEarning: builder.mutation({
      query: ({ data }) => ({
        url: '/update-platform-fee',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')) || ''
          }`,
        },
        body: data,
      }),
      providesTags: ['feedback'],
    }),
  }),
});

export const {
  useGetAllFeedbackQuery,
  useGetSalonListQuery,
  useUpdateEarningMutation,
} = feedbackApis;
