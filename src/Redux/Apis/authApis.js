import { baseApi } from "../baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // user login
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['auth', 'category'],
        }),
        // send verify email
        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/send-verify-email',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['auth']
        }),
        // verify code 
        verifyCode: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/verify-code',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['auth']
        }),
        // reset password 
        resetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/reset-password',
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('accessToken'))) || ""}`,
                    }
                }
            },
            invalidatesTags: ['auth']
        }),
        // change password 
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'reset-pass',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['auth']
        }),
        // update user 
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: 'update-profile',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': "application/json",
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
                    }
                }
            },
            invalidatesTags: ['auth']
        }),
        // get profile 
        getProfile: builder.query({
            query: () => {
                const token = localStorage.getItem('token');
                if (token) {
                    return {
                        url: 'profile',
                        method: 'GET',
                    };
                } else {
                    console.log('No token found, API not called.');
                    return null;
                }
            },
            providesTags: ['auth'],
        })
    })
})
export const {
    //user login
    useLoginUserMutation,
    // send verify email
    useForgetPasswordMutation,
    // verify code
    useVerifyCodeMutation,
    //reset password 
    useResetPasswordMutation,
    //change password
    useChangePasswordMutation,
    // update user 
    useUpdateUserMutation,
    // get profile 
    useGetProfileQuery,
} = authApi