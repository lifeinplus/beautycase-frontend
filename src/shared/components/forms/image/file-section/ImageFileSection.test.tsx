import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import type { Product } from '@/features/products/types'
import { mockUploadResult } from '@/features/uploads/api/__mocks__/uploadsApi'
import {
    useDeleteImageMutation,
    useUploadTempImageMutation,
} from '@/features/uploads/api/uploadsApi'
import { mockError } from '@/tests/mocks'
import {
    mockClearErrors,
    mockFieldError,
    mockFile,
    mockImageId,
    mockSetValue,
} from '@/tests/mocks/form'
import {
    ImageFileSection,
    type ImageFileSectionProps,
} from './ImageFileSection'

vi.mock('@/features/uploads/api/uploadsApi')

describe('ImageFileSection', () => {
    const mockProps: ImageFileSectionProps<Product> = {
        clearErrors: mockClearErrors,
        folder: 'products',
        label: 'Image',
        name: 'imageIds',
        setValue: mockSetValue,
    }

    const mockUpload = vi.fn()
    const mockUploadUnwrap = vi.fn()

    const mockDelete = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUploadTempImageMutation as Mock).mockReturnValue([
            mockUpload,
            { isLoading: false },
        ])

        mockUpload.mockReturnValue({ unwrap: mockUploadUnwrap })
        mockUploadUnwrap.mockResolvedValue(mockUploadResult)

        vi.mocked(useDeleteImageMutation as Mock).mockReturnValue([
            mockDelete,
            { isLoading: false },
        ])

        mockDelete.mockReturnValue({ unwrap: mockDeleteUnwrap })
    })

    it('renders with required props', () => {
        render(<ImageFileSection {...mockProps} />)
        expect(screen.getByText('Image')).toBeInTheDocument()
    })

    it('renders error message', () => {
        render(
            <ImageFileSection {...mockProps} error={mockFieldError.message} />
        )

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if value is provided', () => {
        render(<ImageFileSection {...mockProps} value={mockImageId} />)
        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    describe('File Upload', () => {
        it('uploads file successfully', async () => {
            render(<ImageFileSection {...mockProps} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            expect(mockUpload).toHaveBeenCalledTimes(1)
            expect(mockSetValue).toHaveBeenCalledWith('imageIds', mockImageId)
            expect(mockClearErrors).toHaveBeenCalledWith('imageIds')
        })

        it('handles file upload error', async () => {
            mockUploadUnwrap.mockRejectedValue(mockError)

            render(<ImageFileSection {...mockProps} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            expect(mockUpload).toHaveBeenCalledOnce()
            expect(mockClearErrors).not.toHaveBeenCalled()
            expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
        })

        it('does nothing when file is empty', async () => {
            render(<ImageFileSection {...mockProps} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [] } })
            )

            expect(mockUpload).not.toHaveBeenCalled()
            expect(mockSetValue).not.toHaveBeenCalled()
        })
    })

    describe('Delete Image', () => {
        beforeEach(() => {
            mockDeleteUnwrap.mockResolvedValue({})
        })

        it('deletes image successfully', async () => {
            render(<ImageFileSection {...mockProps} value={mockImageId} />)

            const deleteButton = screen.getByRole('button', {
                name: 'Delete image',
            })

            fireEvent.click(deleteButton)

            await waitFor(() => {
                expect(mockDelete).toHaveBeenCalledTimes(1)
                expect(mockDelete).toHaveBeenCalledWith(mockImageId)

                expect(mockSetValue).toHaveBeenCalledWith('imageIds', null)

                expect(mockClearErrors).toHaveBeenCalledWith('imageIds')
            })
        })

        it('handles delete error', async () => {
            mockDeleteUnwrap.mockRejectedValue(mockError)

            render(<ImageFileSection {...mockProps} value={mockImageId} />)

            const deleteButton = screen.getByRole('button', {
                name: 'Delete image',
            })

            fireEvent.click(deleteButton)

            await waitFor(() => {
                expect(mockDelete).toHaveBeenCalledTimes(1)

                expect(mockSetValue).not.toHaveBeenCalled()
                expect(mockClearErrors).not.toHaveBeenCalled()

                expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
            })
        })

        it('does nothing when no imageId', async () => {
            render(<ImageFileSection {...mockProps} value={undefined} />)

            const deleteButtons = screen.queryByRole('button', {
                name: 'Delete image',
            })

            expect(deleteButtons).toBeNull()

            expect(mockDelete).not.toHaveBeenCalled()
        })
    })
})
