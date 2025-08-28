import { baseApi } from "../baseApi";

const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    notificationsData: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    markReadNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/markread/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllNotification: builder.mutation({
      query: () => ({
        url: `/mark-all-notification`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});
export const { useNotificationsDataQuery, useMarkReadNotificationMutation, useMarkAllNotificationMutation } =
  notificationApis;
