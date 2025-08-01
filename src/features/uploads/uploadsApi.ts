import { api } from '@/shared/api/api'

export interface UploadTempImageUrlRequest {
    folder: 'products' | 'stages' | 'tools'
    imageUrl: string
}

export interface UploadImageResponse {
    imageUrl: string
}

const uploadsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadTempImageByFile: builder.mutation<UploadImageResponse, FormData>({
            query: (data) => ({
                url: `/uploads/temp-image-file`,
                method: 'POST',
                body: data,
            }),
        }),

        uploadTempImageByUrl: builder.mutation<
            UploadImageResponse,
            UploadTempImageUrlRequest
        >({
            query: (data) => ({
                url: `/uploads/temp-image-url`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const {
    useUploadTempImageByFileMutation,
    useUploadTempImageByUrlMutation,
} = uploadsApi
