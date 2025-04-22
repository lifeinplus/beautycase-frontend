import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import { mockUrl } from '../../../tests/mocks/form'
import { type UploadResult } from '../uploadApiSlice'

export const mockUploadResult: UploadResult = { imageUrl: mockUrl }

export const useUploadImageTempMutation = vi.fn()

const uploadsHandlers = [
    http.post('api/uploads/image-temp', async () => {
        return HttpResponse.json({ imageUrl: 'https://example.com/image.jpg' })
    }),
]

export default uploadsHandlers
