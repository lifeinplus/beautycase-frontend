import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
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

    describe('File Upload', () => {
        it('handles file upload successfully', async () => {
            render(<ImageTextSection {...mockProps} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            expect(mockUpload).toHaveBeenCalledTimes(1)
            expect(mockSetValue).toHaveBeenCalledWith(
                'makeupBag',
                '[photoAttached]'
            )
            expect(mockClearErrors).toHaveBeenCalledWith('makeupBag')
        })

        it('handles upload error', async () => {
            mockUploadUnwrap.mockRejectedValue(mockError)

            render(<ImageTextSection {...mockProps} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            expect(mockUpload).toHaveBeenCalledTimes(1)

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

        it('uses existing text value when uploading file', async () => {
            const mockText = 'Custom Text'

            render(<ImageTextSection {...mockProps} value={mockText} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            expect(mockSetValue).toHaveBeenCalledWith('makeupBag', mockText)
        })
    })

    describe('Delete Image', () => {
        beforeEach(() => {
            mockDeleteUnwrap.mockResolvedValue({})
        })

        it('deletes image successfully', async () => {
            render(<ImageTextSection {...mockProps} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            const deleteButton = screen.getByRole('button', {
                name: 'Delete image',
            })

            fireEvent.click(deleteButton)

            await waitFor(() => {
                expect(mockDelete).toHaveBeenCalledTimes(1)
                expect(mockDelete).toHaveBeenCalledWith(mockImageId)
                expect(mockSetValue).toHaveBeenCalledWith(
                    'makeupBag',
                    '[photoAttached]'
                )
                expect(mockClearErrors).toHaveBeenCalledWith('makeupBag')
            })
        })

        it('handles delete error', async () => {
            mockDeleteUnwrap.mockRejectedValue(mockError)

            render(<ImageTextSection {...mockProps} value={mockImageId} />)

            const uploadButton = screen.getByRole('button', {
                name: 'Upload images',
            })

            const input = uploadButton.querySelector('input[type="file"]')

            await waitFor(() =>
                fireEvent.change(input!, { target: { files: [mockFile] } })
            )

            mockSetValue.mockReset()
            mockClearErrors.mockReset()

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
            render(<ImageTextSection {...mockProps} value={undefined} />)

            const deleteButtons = screen.queryByRole('button', {
                name: 'Delete image',
            })

            expect(deleteButtons).toBeNull()

            expect(mockDelete).not.toHaveBeenCalled()
        })
    })
})
