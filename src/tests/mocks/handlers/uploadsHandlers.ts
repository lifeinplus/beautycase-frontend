import { http, HttpResponse } from 'msw'

import { type UploadResult } from '../../../features/uploads/uploadApiSlice'
import { mockUrl } from '../form'

export const mockUploadResult: UploadResult = { imageUrl: mockUrl }

export const uploadsHandlers = [
    http.post('api/uploads/image-temp', async () => {
        return HttpResponse.json({ imageUrl: 'https://example.com/image.jpg' })
    }),
]
