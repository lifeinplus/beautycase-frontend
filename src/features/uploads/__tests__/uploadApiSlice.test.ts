import { act } from 'react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '../../../tests/mocks/server'
import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import { type DataMessageError } from '../../../utils/errorUtils'
import { useUploadImageTempMutation } from '../uploadApiSlice'

describe('uploadApiSlice', () => {
    it('uploads an image successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useUploadImageTempMutation()
        )

        const [uploadImageTemp] = result.current

        const formData = new FormData()

        formData.append(
            'imageFile',
            new Blob(['image content'], { type: 'image/jpeg' })
        )

        await act(async () => {
            const response = await uploadImageTemp(formData).unwrap()

            expect(response).toEqual({
                imageUrl: 'https://example.com/image.jpg',
            })
        })
    })

    it('handles API error', async () => {
        server.use(
            http.post('api/uploads/image-temp', async () => {
                return HttpResponse.json(
                    { message: 'Upload failed' },
                    { status: 500 }
                )
            })
        )

        const { result } = renderHookWithProvider(() =>
            useUploadImageTempMutation()
        )

        const [uploadImageTemp] = result.current

        const formData = new FormData()

        formData.append(
            'imageFile',
            new Blob(['image content'], { type: 'image/jpeg' })
        )

        let error: DataMessageError | undefined

        await act(async () => {
            try {
                await uploadImageTemp(formData).unwrap()
            } catch (err) {
                error = err as DataMessageError
            }
        })

        expect(error).toBeDefined()
        expect(error?.status).toBe(500)
        expect(error?.data).toEqual({ message: 'Upload failed' })
    })
})
