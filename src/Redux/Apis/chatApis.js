import { baseApi } from "../baseApi";

const chatApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChatList: builder.query({
            query: ({ search, role_type }) => `/chat-list?role_type=${role_type}&search=${search || ""}`,
        }),
        getMessage: builder.query({
            query: ({ receiver_id }) => `/get-message?receiver_id=${receiver_id}`,
            providesTags: ['msg']
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/send-message`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['msg']
        }),
    }),
});

export const { useGetChatListQuery, useGetMessageQuery, useSendMessageMutation } = chatApis;
