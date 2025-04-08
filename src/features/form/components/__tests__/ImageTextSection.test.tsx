import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

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

describe('ImageTextSection', () => {
    const mockClearErrors = vi.fn()
    const mockRegister = vi.fn()
    const mockSetValue = vi.fn()

    const mockProps: ImageTextSectionProps<Questionnaire> = {
        clearErrors: mockClearErrors,
        folder: 'questionnaires',
        label: 'Makeup Bag',
        labelUrl: 'Makeup Bag Photo Url',
        name: 'makeupBag',
        nameUrl: 'makeupBagPhotoUrl',
        register: mockRegister('makeupBag'),
        registerUrl: mockRegister('makeupBagPhotoUrl'),
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
        render(<ImageTextSection {...mockProps} />)
        expect(screen.getByText('Makeup Bag')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Makeup Bag')).toBeInTheDocument()
    })

    it('renders with description and error message', () => {
        const mockDescription = 'Upload a product image'
        const errorMessage = 'This field is required'

        render(
            <ImageTextSection
                {...mockProps}
                description={mockDescription}
                error={{ type: 'required', message: errorMessage }}
            />
        )

        const description = screen.getByText(mockDescription)
        const error = screen.getByText(errorMessage)

        expect(description).toBeInTheDocument()
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if valueUrl is present', () => {
        render(<ImageTextSection {...mockProps} valueUrl={mockUrl} />)
        expect(screen.getByRole('img')).toBeInTheDocument()
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

        const mockError = new Error('Upload failed')

        const mockUploadImageTemp = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useUploadImageTempMutation as Mock).mockReturnValue([
            mockUploadImageTemp,
        ])

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
