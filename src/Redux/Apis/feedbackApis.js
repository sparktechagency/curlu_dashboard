import { baseApi } from '../baseApi';

const feedbackApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: ({ page, date, salon_id }) => ({
        url: '/feedback',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')) || ''
          }`,
        },
        params: { page, date, salon_id },
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
