import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
    reducerPath: 'HairSalon',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.174.189.197:8000/api",
        headers: {
            Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["auth", 'category'],
})
export const imageUrl = 'http://103.174.189.197:8000/'
export const generateImage = (image) => {
    if (typeof image !== 'string') {
        return '';
    }

    if (image.includes('http')) {
        return image;
    }
    if (image.startsWith('/')) {
        return `http://103.174.189.197:8000${image}`;
    }
    return `http://103.174.189.197:8000/${image}`;
}