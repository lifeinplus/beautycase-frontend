import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import { mockImageUrl1 } from '../../../tests/mocks/form'
import { type UploadImageResponse } from '../uploadsApi'

export const mockUploadResult: UploadImageResponse = { imageUrl: mockImageUrl1 }

export const useUploadTempImageByFileMutation = vi.fn()
export const useUploadTempImageByUrlMutation = vi.fn()

const uploadsHandlers = [
    http.post('api/uploads/temp-image-file', async () => {
        return HttpResponse.json({ imageUrl: mockImageUrl1 })
    }),

    http.post('api/uploads/temp-image-url', async () => {
        return HttpResponse.json({ imageUrl: mockImageUrl1 })
    }),
]

export default uploadsHandlers
