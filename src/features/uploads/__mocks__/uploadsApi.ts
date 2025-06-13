import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import { mockUrl } from '../../../tests/mocks/form'
import { type UploadImageResponse } from '../uploadsApi'

export const mockUploadResult: UploadImageResponse = { imageUrl: mockUrl }

export const useUploadTempImageByFileMutation = vi.fn()
export const useUploadTempImageByUrlMutation = vi.fn()

const uploadsHandlers = [
    http.post('api/uploads/temp-image-file', async () => {
        return HttpResponse.json({ imageUrl: 'https://example.com/image.jpg' })
    }),

    http.post('api/uploads/temp-image-url', async () => {
        return HttpResponse.json({ imageUrl: 'https://example.com/image.jpg' })
    }),
]

export default uploadsHandlers
