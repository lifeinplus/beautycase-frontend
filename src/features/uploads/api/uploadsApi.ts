import { api } from '@/shared/api/api'

export interface UploadTempImageUrlRequest {
    folder: 'products' | 'stages' | 'tools'
    imageUrl: string
}

export interface UploadImageResponse {
    imageId: string
}

const uploadsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadTempImage: builder.mutation<UploadImageResponse, FormData>({
            query: (data) => ({
                url: `/uploads/temp-image`,
                method: 'POST',
                body: data,
            }),
        }),

        deleteImage: builder.mutation<UploadImageResponse, string>({
            query: (imageId) => ({
                url: '/uploads/image',
                method: 'DELETE',
                body: { imageId },
            }),
        }),
    }),
})

export const { useUploadTempImageMutation, useDeleteImageMutation } = uploadsApi
