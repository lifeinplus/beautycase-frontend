import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
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
import { spyConsoleError } from '@/tests/setup'
import {
    ImageTextSection,
    type ImageTextSectionProps,
} from './ImageTextSection'

vi.mock('@/features/uploads/api/uploadsApi')

describe('ImageTextSection', () => {
    const mockProps: ImageTextSectionProps<MakeupBagQuestionnaire> = {
        clearErrors: mockClearErrors,
        folder: 'questionnaires',
        label: 'Makeup Bag',
        name: 'makeupBag',
        nameIds: 'makeupBagPhotoIds',
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
        render(<ImageTextSection {...mockProps} />)
        expect(screen.getByText('Makeup Bag')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Makeup Bag')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(
            <ImageTextSection {...mockProps} description={mockDescription} />
        )

        expect(screen.getByText(mockDescription)).toBeInTheDocument()
    })

    it('renders error message', () => {
        render(
            <ImageTextSection {...mockProps} error={mockFieldError.message} />
        )

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('handles file upload successfully', async () => {
        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadTempImage).toHaveBeenCalledTimes(1)
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
        mockUnwrap.mockRejectedValue(mockError)

        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() =>
            fireEvent.change(input, { target: { files: [mockFile] } })
        )

        expect(mockUploadTempImage).toHaveBeenCalledTimes(1)

        expect(mockSetValue).not.toHaveBeenCalled()
        expect(mockClearErrors).not.toHaveBeenCalled()

        expect(spyConsoleError).toHaveBeenCalledWith(
            'Image upload failed',
            mockError
        )
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
    })

    it('does nothing when no file is selected', async () => {
        render(<ImageTextSection {...mockProps} />)

        const input = screen.getByLabelText('', {
            selector: 'input[type="file"]',
        })

        await waitFor(() => fireEvent.change(input, { target: { files: [] } }))

        expect(mockUploadTempImage).not.toHaveBeenCalled()
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
