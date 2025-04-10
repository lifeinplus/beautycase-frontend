import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import type { Product } from '../../../products/types'
import { useUploadImageTempMutation } from '../../../uploads/uploadApiSlice'
import { type ImagePreviewProps } from '../ImagePreview'
import { ImageUrlSection, type ImageUrlSectionProps } from '../ImageUrlSection'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../../uploads/uploadApiSlice', () => ({
    useUploadImageTempMutation: vi.fn(),
}))

vi.mock('../ImagePreview', () => ({
    ImagePreview: ({ url }: ImagePreviewProps) => (
        <img data-testid="image-preview" src={url} />
    ),
}))

describe('ImageUrlSection', () => {
    const mockClearErrors = vi.fn()
    const mockRegister = vi.fn()
    const mockSetValue = vi.fn()

    const mockProps: ImageUrlSectionProps<Product> = {
        clearErrors: mockClearErrors,
        folder: 'products',
        label: 'Image Url',
        name: 'imageUrl',
        register: mockRegister('imageUrl'),
        setValue: mockSetValue,
    }

    const mockFile = new File(['image'], 'image.png', { type: 'image/png' })

    const mockUrl = 'https://example.com/image.jpg'
    const mockResult = { imageUrl: mockUrl }

    const mockUploadImageTemp = vi.fn(() => ({
        unwrap: () => Promise.resolve(mockResult),
    }))

    beforeEach(() => {
        vi.mocked(useUploadImageTempMutation as Mock).mockReturnValue([
            mockUploadImageTemp,
        ])
    })

    it('renders with required props', () => {
        render(<ImageUrlSection {...mockProps} />)

        expect(screen.getByText('Image Url')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Image Url')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<ImageUrlSection {...mockProps} description={mockDescription} />)

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('renders error message', () => {
        const mockError = {
            message: 'This field is required',
            type: 'required',
        }

        render(<ImageUrlSection {...mockProps} error={mockError} />)

        const error = screen.getByText(mockError.message)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if imageUrl is present', () => {
        render(<ImageUrlSection {...mockProps} value={mockUrl} />)

        const image = screen.getByTestId('image-preview') as HTMLImageElement

        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockUrl)
    })

    it('handles file upload successfully', async () => {
        render(<ImageUrlSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadImageTemp).toHaveBeenCalledTimes(1)
        expect(mockSetValue).toHaveBeenCalledWith('imageUrl', mockUrl)
        expect(mockClearErrors).toHaveBeenCalledWith('imageUrl')
    })

    it('handles upload error', async () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockError = new Error('Upload failed')

        const mockUploadImageTemp = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useUploadImageTempMutation as Mock).mockReturnValue([
            mockUploadImageTemp,
        ])

        render(<ImageUrlSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadImageTemp).toHaveBeenCalledTimes(1)

        expect(mockSetValue).not.toHaveBeenCalled()
        expect(mockClearErrors).not.toHaveBeenCalled()

        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('does nothing when no file is selected', async () => {
        render(<ImageUrlSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() => fireEvent.change(input, { target: { files: [] } }))

        expect(mockUploadImageTemp).not.toHaveBeenCalled()
        expect(mockSetValue).not.toHaveBeenCalled()
    })
})
