import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseApi = createApi({
  reducerPath: 'HairSalon',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://182.252.68.227:8007/api',
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('token')) || ''
      }`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['auth', 'category', 'msg', 'earning', 'feedback'],
});
export const imageUrl = 'http://182.252.68.227:8007/';
export const generateImage = (image) => {
  if (typeof image !== 'string') {
    return '';
  }

  if (image.includes('http')) {
    return image;
  }
  if (image.startsWith('/')) {
    return `http://182.252.68.227:8007${image}`;
  }
  return `http://182.252.68.227:8007/${image}`; //
};
