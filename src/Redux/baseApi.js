import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
    reducerPath: 'HairSalon',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://210.4.77.100:8000/api",
        headers: {
            Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["auth", 'category'],
})

export const imageUrl = 'http://210.4.77.100:8000/'
export const generateImage = (image) => {
    if (typeof image !== 'string') {
        return '';
    }

    if (image.includes('http')) {
        return image;
    }
    if (image.startsWith('/')) {
        return `http://210.4.77.100:8000${image}`;
    }
    return `http://210.4.77.100:8000/${image}`;
}