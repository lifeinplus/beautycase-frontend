import { apiSlice } from '../api/apiSlice'

export interface UploadResult {
    imageUrl: string
}

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImageTemp: builder.mutation<UploadResult, FormData>({
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
