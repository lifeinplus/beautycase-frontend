import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import {
    mockClearErrors,
    mockFieldError,
    mockFile,
    mockRegister,
    mockSetValue,
    mockUrl,
} from '../../../../tests/mocks/form'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import type { Product } from '../../../products/types'
import { mockUploadResult } from '../../../uploads/__mocks__/uploadsApi'
import {
    useUploadTempImageByFileMutation,
    useUploadTempImageByUrlMutation,
} from '../../../uploads/uploadsApi'
import { ImageUrlSection, type ImageUrlSectionProps } from '../ImageUrlSection'

vi.mock('../../../../utils/errorUtils')
vi.mock('../../../uploads/uploadsApi')
vi.mock('../ImagePreview')
vi.mock('../Label')

describe('ImageUrlSection', () => {
    const mockProps: ImageUrlSectionProps<Product> = {
        clearErrors: mockClearErrors,
        folder: 'products',
        label: 'Image Url',
        name: 'imageUrl',
        register: mockRegister,
        setValue: mockSetValue,
    }

    const mockUploadTempImageByFile = vi.fn()
    const mockUnwrapByFile = vi.fn()

    const mockUploadTempImageByUrl = vi.fn()
    const mockUnwrapByUrl = vi.fn()

    beforeEach(() => {
        vi.mocked(useUploadTempImageByFileMutation as Mock).mockReturnValue([
            mockUploadTempImageByFile,
        ])

        mockUploadTempImageByFile.mockReturnValue({ unwrap: mockUnwrapByFile })
        mockUnwrapByFile.mockResolvedValue(mockUploadResult)

        vi.mocked(useUploadTempImageByUrlMutation as Mock).mockReturnValue([
            mockUploadTempImageByUrl,
        ])

        mockUploadTempImageByUrl.mockReturnValue({ unwrap: mockUnwrapByUrl })
        mockUnwrapByUrl.mockResolvedValue(mockUploadResult)
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
        render(<ImageUrlSection {...mockProps} error={mockFieldError} />)

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if value is provided', () => {
        render(<ImageUrlSection {...mockProps} value={mockUrl} />)

        const image = screen.getByTestId(
            'mocked-image-preview'
        ) as HTMLImageElement

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

        expect(mockUploadTempImageByFile).toHaveBeenCalledTimes(1)
        expect(mockSetValue).toHaveBeenCalledWith('imageUrl', mockUrl)
        expect(mockClearErrors).toHaveBeenCalledWith('imageUrl')
    })

    it('handles upload error', async () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrapByFile.mockRejectedValue(mockError)

        render(<ImageUrlSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadTempImageByFile).toHaveBeenCalledTimes(1)

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

        expect(mockUploadTempImageByFile).not.toHaveBeenCalled()
        expect(mockSetValue).not.toHaveBeenCalled()
    })
})
