import { api } from '../api/api'

export interface UploadResult {
    imageUrl: string
}

const uploadsApi = api.injectEndpoints({
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

export const { useUploadImageTempMutation } = uploadsApi
