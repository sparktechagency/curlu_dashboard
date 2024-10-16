import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
    reducerPath: 'HairSalon',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://210.4.77.98:8000/api",
        headers: {
            Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["auth", 'category'],
})

export const imageUrl = 'http://210.4.77.98:8000/'