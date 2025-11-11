import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import { mockImageUrl1 } from '@/tests/mocks/form'
import { type UploadImageResponse } from '../uploadsApi'

export const mockUploadResult: UploadImageResponse = { imageUrl: mockImageUrl1 }

export const useUploadTempImageMutation = vi.fn()

const uploadsHandlers = [
    http.post('api/uploads/temp-image', async () => {
        return HttpResponse.json({ imageUrl: mockImageUrl1 })
    }),
]

export default uploadsHandlers
