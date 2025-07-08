import { act } from 'react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { mockImageUrl1, mockImageUrl2 } from '@/tests/mocks/form'
import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import { type DataMessageError } from '@/shared/utils/errorUtils'
import {
    useUploadTempImageByFileMutation,
    useUploadTempImageByUrlMutation,
} from '../uploadsApi'
import type {
    UploadImageResponse,
    UploadTempImageUrlRequest,
} from '../uploadsApi'

describe('uploadsApi', () => {
    const mockFileData = new FormData()

    mockFileData.append(
        'imageFile',
        new Blob(['image content'], { type: 'image/jpeg' })
    )

    const mockUrlData: UploadTempImageUrlRequest = {
        folder: 'products',
        imageUrl: mockImageUrl2,
    }

    describe('uploadTempImageByFile', () => {
        it('uploads an image file successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useUploadTempImageByFileMutation()
            )

            const [uploadTempImageByFile] = result.current

            let response: UploadImageResponse | undefined

            await act(async () => {
                response = await uploadTempImageByFile(mockFileData).unwrap()
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
                useUploadTempImageByFileMutation()
            )

            const [uploadTempImageByFile] = result.current

            let error: DataMessageError | undefined

            try {
                await act(async () => {
                    await uploadTempImageByFile(mockFileData).unwrap()
                })
            } catch (err) {
                error = err as DataMessageError
            }

            expect(error).toBeDefined()
            expect(error?.status).toBe(500)
            expect(error?.data).toEqual({ message: 'File upload failed' })
        })
    })

    describe('uploadTempImageByUrl', () => {
        it('uploads an image by URL successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useUploadTempImageByUrlMutation()
            )

            const [uploadTempImageByUrl] = result.current

            let response: UploadImageResponse | undefined

            await act(async () => {
                response = await uploadTempImageByUrl(mockUrlData).unwrap()
            })

            expect(response).toEqual({ imageUrl: mockImageUrl1 })
        })

        it('handles image URL upload API error', async () => {
            server.use(
                http.post('api/uploads/temp-image-url', async () =>
                    HttpResponse.json(
                        { message: 'URL upload failed' },
                        { status: 500 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useUploadTempImageByUrlMutation()
            )

            const [uploadTempImageByUrl] = result.current

            let error: DataMessageError | undefined

            try {
                await act(async () => {
                    await uploadTempImageByUrl(mockUrlData).unwrap()
                })
            } catch (err) {
                error = err as DataMessageError
            }

            expect(error).toBeDefined()
            expect(error?.status).toBe(500)
            expect(error?.data).toEqual({ message: 'URL upload failed' })
        })
    })
})
