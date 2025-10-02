import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { mockUploadResult } from '@/features/uploads/api/__mocks__/uploadsApi'
import { useUploadTempImageByFileMutation } from '@/features/uploads/api/uploadsApi'
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
    ImageTextSection,
    type ImageTextSectionProps,
} from './ImageTextSection'

vi.mock('@/features/uploads/api/uploadsApi')
vi.mock('../../label/Label')
vi.mock('../preview/ImagePreview')

describe('ImageTextSection', () => {
    const mockProps: ImageTextSectionProps<MakeupBagQuestionnaire> = {
        clearErrors: mockClearErrors,
        folder: 'questionnaires',
        label: 'Makeup Bag',
        labelUrl: 'Makeup Bag Photo Url',
        name: 'makeupBag',
        nameUrl: 'makeupBagPhotoUrl',
        register: mockRegister,
        registerUrl: mockRegister,
        setValue: mockSetValue,
    }

    const mockUploadTempImageByFile = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUploadTempImageByFileMutation as Mock).mockReturnValue([
            mockUploadTempImageByFile,
        ])

        mockUploadTempImageByFile.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockUploadResult)
    })

    it('renders with required props', () => {
        render(<ImageTextSection {...mockProps} />)
        expect(screen.getByText('Makeup Bag')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Makeup Bag')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(
            <ImageTextSection {...mockProps} description={mockDescription} />
        )

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass(/description/)
    })

    it('renders error message', () => {
        render(
            <ImageTextSection {...mockProps} error={mockFieldError.message} />
        )

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if valueUrl is present', () => {
        render(<ImageTextSection {...mockProps} valueUrl={mockImageUrl1} />)

        const image = screen.getByTestId(
            'mocked-image-preview'
        ) as HTMLImageElement

        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockImageUrl1)
    })

    it('handles file upload successfully', async () => {
        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadTempImageByFile).toHaveBeenCalledTimes(1)
        expect(mockSetValue).toHaveBeenCalledWith(
            'makeupBag',
            '[photoAttached]'
        )
        expect(mockSetValue).toHaveBeenCalledWith(
            'makeupBagPhotoUrl',
            mockImageUrl1
        )
        expect(mockClearErrors).toHaveBeenCalledWith('makeupBag')
    })

    it('handles upload error', async () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ImageTextSection {...mockProps} />)

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
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })

    it('does nothing when no file is selected', async () => {
        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() => fireEvent.change(input, { target: { files: [] } }))

        expect(mockUploadTempImageByFile).not.toHaveBeenCalled()
        expect(mockSetValue).not.toHaveBeenCalled()
    })

    it('uses existing text value when uploading file', async () => {
        const mockText = 'Custom Text'

        render(<ImageTextSection {...mockProps} value={mockText} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockSetValue).toHaveBeenCalledWith('makeupBag', mockText)
    })
})
