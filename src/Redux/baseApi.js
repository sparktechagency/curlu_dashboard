import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseApi = createApi({
  reducerPath: 'HairSalon',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://103.186.20.114:8007',
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('token')) || ''
      }`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['auth', 'category', 'msg', 'earning', 'feedback'],
});
export const imageUrl = 'http://103.186.20.114:8007';
export const generateImage = (image) => {
  if (typeof image !== 'string') {
    return '';
  }

  if (image.includes('http')) {
    return image;
  }
  if (image.startsWith('/')) {
    return `http://103.186.20.114:8007/${image}`;
  }
  return `http://103.186.20.114:8007/${image}`; //
};
