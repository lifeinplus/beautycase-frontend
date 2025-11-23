import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import { mockImageId } from '@/tests/mocks/form'
import { type UploadImageResponse } from '../uploadsApi'

export const mockUploadResult: UploadImageResponse = { imageId: mockImageId }

export const useUploadTempImageMutation = vi.fn()
export const useDeleteImageMutation = vi.fn()

const uploadsHandlers = [
    http.post('api/uploads/temp-image', async () => {
        return HttpResponse.json({ imageId: mockImageId })
    }),

    http.delete('api/uploads/image', async () => {
        return HttpResponse.json({}, { status: 200 })
    }),
]

export default uploadsHandlers
