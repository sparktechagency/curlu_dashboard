import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseApi = createApi({
  reducerPath: 'HairSalon',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://16.171.67.85/api',
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('token')) || ''
      }`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['auth', 'category', 'msg', 'earning', 'feedback'],
});
export const imageUrl = 'http://16.171.67.85/api/';
export const generateImage = (image) => {
  if (typeof image !== 'string') {
    return '';
  }

  if (image.includes('http')) {
    return image;
  }
  if (image.startsWith('/')) {
    return `http://16.171.67.85/api${image}`;
  }
  return `http://16.171.67.85/api/${image}`; //
};
