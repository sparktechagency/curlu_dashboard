import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "HairSalon",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://16.171.67.85/api",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")) || ""
      }`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "category", "msg", "earning", "feedback"],
});
export const imageUrl = "http://16.171.67.85/api/";
export const url = "http://16.171.67.85/";
export const generateImage = (image) => {
  return image
    ? image?.startsWith("http")
      ? image
      : image?.startsWith("/")
      ? `${url}${image}`
      : `${url}/${image}`
    : "https://i.ibb.co/B2xfD8H/images.png";
};
