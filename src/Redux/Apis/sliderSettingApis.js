import { baseApi } from "../baseApi";

const sliderSettingApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSliders: builder.query({
            query: (page) => ({
                url: `/sliders?page=${page || 1}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                }
            })
        }),
        addSlider: builder.mutation({
            query: (sliderData) => ({
                url: "/sliders",
                method: "POST",
                body: sliderData,
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                }
            }),
        }),
        updateSlider: builder.mutation({
            query: ({ id, sliderData }) => ({
                url: `/sliders/${id}?_method=PUT`,
                method: "POST",
                body: sliderData,
                headers: {
                    'Accept': "application/json",
                    Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                }
            }),
        }),
        deleteSlider: builder.mutation({
            query: (id) => ({
                url: `/sliders/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetSlidersQuery,
    useAddSliderMutation,
    useUpdateSliderMutation,
    useDeleteSliderMutation,
} = sliderSettingApis;
