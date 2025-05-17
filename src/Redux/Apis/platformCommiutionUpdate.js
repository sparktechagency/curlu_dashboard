import { baseApi } from '../baseApi';

const platformCommiutionUpdate = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: () => ({
        url: '/get-platform-fee',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')) || ''
          }`,
        },
      }),
      providesTags: ['earning'],
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
      providesTags: ['earning'],
    }),
  }),
});

export const { useGetEarningQuery, useUpdateEarningMutation } =
  platformCommiutionUpdate;
