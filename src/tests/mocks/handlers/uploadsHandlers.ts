import { http, HttpResponse } from 'msw'

export const uploadsHandlers = [
    http.post('api/uploads/image-temp', async () => {
        return HttpResponse.json({ imageUrl: 'https://example.com/image.jpg' })
    }),
]
