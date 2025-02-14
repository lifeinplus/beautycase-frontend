import { apiSlice } from '../api/apiSlice'

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImageTemp: builder.mutation<{ imageUrl: string }, FormData>({
            query: (formData) => {
                return {
                    url: `/uploads/image-temp`,
                    method: 'POST',
                    body: formData,
                }
            },
        }),
    }),
})

export const { useUploadImageTempMutation } = uploadApiSlice
