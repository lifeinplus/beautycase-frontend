import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockUploadResult } from '../../../../tests/mocks/handlers/uploadsHandlers'
import {
    mockClearErrors,
    mockFieldError,
    mockFile,
    mockRegister,
    mockSetValue,
    mockUrl,
} from '../../../../tests/mocks/form'
import type { Questionnaire } from '../../../questionnaires/types'
import { useUploadImageTempMutation } from '../../../uploads/uploadApiSlice'
import {
    ImageTextSection,
    type ImageTextSectionProps,
} from '../ImageTextSection'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../../uploads/uploadApiSlice', () => ({
    useUploadImageTempMutation: vi.fn(),
}))

vi.mock('../ImagePreview')

describe('ImageTextSection', () => {
    const mockProps: ImageTextSectionProps<Questionnaire> = {
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

    const mockUploadImageTemp = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUploadImageTempMutation as Mock).mockReturnValue([
            mockUploadImageTemp,
        ])

        mockUploadImageTemp.mockReturnValue({ unwrap: mockUnwrap })
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
        expect(description).toHaveClass('form-description')
    })

    it('renders error message', () => {
        render(<ImageTextSection {...mockProps} error={mockFieldError} />)

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if valueUrl is present', () => {
        render(<ImageTextSection {...mockProps} valueUrl={mockUrl} />)

        const image = screen.getByTestId(
            'mocked-image-preview'
        ) as HTMLImageElement

        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockUrl)
    })

    it('handles file upload successfully', async () => {
        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadImageTemp).toHaveBeenCalledTimes(1)
        expect(mockSetValue).toHaveBeenCalledWith(
            'makeupBag',
            '[приложено фото]'
        )
        expect(mockSetValue).toHaveBeenCalledWith('makeupBagPhotoUrl', mockUrl)
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

        expect(mockUploadImageTemp).toHaveBeenCalledTimes(1)

        expect(mockSetValue).not.toHaveBeenCalled()
        expect(mockClearErrors).not.toHaveBeenCalled()

        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('does nothing when no file is selected', async () => {
        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() => fireEvent.change(input, { target: { files: [] } }))

        expect(mockUploadImageTemp).not.toHaveBeenCalled()
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
