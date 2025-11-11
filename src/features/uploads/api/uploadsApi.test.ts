import { http, HttpResponse } from 'msw'
import { act } from 'react'
import { describe, expect, it } from 'vitest'

import type { ApiErrorResponse } from '@/shared/utils/error/types'
import { mockImageUrl1 } from '@/tests/mocks/form'
import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import type { UploadImageResponse } from './uploadsApi'
import { useUploadTempImageMutation } from './uploadsApi'

describe('uploadsApi', () => {
    const mockFileData = new FormData()

    mockFileData.append(
        'imageFile',
        new Blob(['image content'], { type: 'image/jpeg' })
    )

    describe('uploadTempImage', () => {
        it('uploads an image file successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useUploadTempImageMutation()
            )

            const [uploadTempImage] = result.current

            let response: UploadImageResponse | undefined

            await act(async () => {
                response = await uploadTempImage(mockFileData).unwrap()
            })

            expect(response).toEqual({ imageUrl: mockImageUrl1 })
        })

        it('handles image file upload API error', async () => {
            server.use(
                http.post('api/uploads/temp-image-file', async () =>
                    HttpResponse.json(
                        { message: 'File upload failed' },
                        { status: 500 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useUploadTempImageMutation()
            )

            const [uploadTempImage] = result.current

            let error: { status: number; data: ApiErrorResponse } | undefined

            try {
                await act(async () => {
                    await uploadTempImage(mockFileData).unwrap()
                })
            } catch (err) {
                error = err as { status: number; data: ApiErrorResponse }
            }

            expect(error).toBeDefined()
            expect(error?.status).toBe(500)
            expect(error?.data).toEqual({ message: 'File upload failed' })
        })
    })
})
