import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import type { Product } from '@/features/products/types'
import { mockUploadResult } from '@/features/uploads/api/__mocks__/uploadsApi'
import { useUploadTempImageMutation } from '@/features/uploads/api/uploadsApi'
import { mockError } from '@/tests/mocks'
import {
    mockClearErrors,
    mockFieldError,
    mockFile,
    mockImageUrl1,
    mockRegister,
    mockSetValue,
} from '@/tests/mocks/form'
import {
    ImageFilesSection,
    type ImageFilesSectionProps,
} from './ImageFilesSection'

vi.mock('@/features/uploads/api/uploadsApi')

describe('ImageFilesSection', () => {
    const mockProps: ImageFilesSectionProps<Product> = {
        clearErrors: mockClearErrors,
        folder: 'products',
        label: 'Image Url',
        name: 'imageUrl',
        register: mockRegister,
        setValue: mockSetValue,
    }

    const mockUploadTempImage = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUploadTempImageMutation as Mock).mockReturnValue([
            mockUploadTempImage,
        ])

        mockUploadTempImage.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockUploadResult)
    })

    it('renders with required props', () => {
        render(<ImageFilesSection {...mockProps} />)

        expect(screen.getByText('Image Url')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Image Url')).toBeInTheDocument()
    })

    it('renders error message', () => {
        render(
            <ImageFilesSection {...mockProps} error={mockFieldError.message} />
        )

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if value is provided', () => {
        render(<ImageFilesSection {...mockProps} value={mockImageUrl1} />)

        const image = screen.getByRole('img') as HTMLImageElement

        expect(image.src).toBe(mockImageUrl1)
    })

    describe('File Upload', () => {
        it('uploads file successfully', async () => {
            render(<ImageFilesSection {...mockProps} />)

            const input = screen.getByLabelText('', {
                selector: 'input[type="file"]',
            })

            await waitFor(() =>
                fireEvent.change(input, { target: { files: [mockFile] } })
            )

            expect(mockUploadTempImage).toHaveBeenCalledTimes(1)
            expect(mockSetValue).toHaveBeenCalledWith('imageUrl', mockImageUrl1)
            expect(mockClearErrors).toHaveBeenCalledWith('imageUrl')
        })

        it('handles file upload error', async () => {
            mockUnwrap.mockRejectedValue(mockError)

            render(<ImageFilesSection {...mockProps} />)

            const input = screen.getByLabelText('', {
                selector: 'input[type="file"]',
            })

            await waitFor(() =>
                fireEvent.change(input, { target: { files: [mockFile] } })
            )

            expect(mockSetValue).toHaveBeenCalledWith('imageUrl', '')
            expect(mockUploadTempImage).toHaveBeenCalledOnce()
            expect(mockClearErrors).not.toHaveBeenCalled()
            expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
        })

        it('does nothing when file is empty', async () => {
            render(<ImageFilesSection {...mockProps} />)

            const input = screen.getByLabelText('', {
                selector: 'input[type="file"]',
            })

            await waitFor(() =>
                fireEvent.change(input, { target: { files: [] } })
            )

            expect(mockUploadTempImage).not.toHaveBeenCalled()
            expect(mockSetValue).not.toHaveBeenCalled()
        })
    })
})
