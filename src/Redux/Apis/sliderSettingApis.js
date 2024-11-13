import { baseApi } from "../baseApi";

const sliderSettingApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSliders: builder.query({
            query: (page) => `/sliders?page=${page || 1}`,
        }),
        addSlider: builder.mutation({
            query: (sliderData) => ({
                url: "/sliders",
                method: "POST",
                body: sliderData,
            }),
        }),
        updateSlider: builder.mutation({
            query: ({ id, sliderData }) => ({
                url: `/sliders/${id}?_method=PUT`,
                method: "POST",
                body: sliderData,
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
