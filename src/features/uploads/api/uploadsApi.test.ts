import { http, HttpResponse } from 'msw'
import { act } from 'react'
import { describe, expect, it } from 'vitest'

import type { ApiErrorResponse } from '@/shared/utils/error/types'
import { mockImageId } from '@/tests/mocks/form'
import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import type { UploadImageResponse } from './uploadsApi'
import {
    useDeleteImageMutation,
    useUploadTempImageMutation,
} from './uploadsApi'

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

            expect(response).toEqual({ imageId: mockImageId })
        })

        it('handles image file upload API error', async () => {
            server.use(
                http.post('api/uploads/temp-image', async () =>
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

    describe('deleteImage', () => {
        it('deletes an image successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteImageMutation()
            )

            const [deleteImage] = result.current

            await act(async () => {
                await expect(
                    deleteImage(mockImageId).unwrap()
                ).resolves.not.toThrow()
            })
        })

        it('handles delete image API error', async () => {
            server.use(
                http.delete('api/uploads/image', async () =>
                    HttpResponse.json(
                        { message: 'Delete failed' },
                        { status: 500 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useDeleteImageMutation()
            )

            const [deleteImage] = result.current

            let error: { status: number; data: ApiErrorResponse } | undefined

            try {
                await act(async () => {
                    await deleteImage(mockImageId).unwrap()
                })
            } catch (err) {
                error = err as { status: number; data: ApiErrorResponse }
            }

            expect(error).toBeDefined()
            expect(error?.status).toBe(500)
            expect(error?.data).toEqual({ message: 'Delete failed' })
        })
    })
})
