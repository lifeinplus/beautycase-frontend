import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    vi,
} from 'vitest'

import type { Product } from '@/features/products/types'
import { mockUploadResult } from '@/features/uploads/__mocks__/uploadsApi'
import {
    useUploadTempImageByFileMutation,
    useUploadTempImageByUrlMutation,
} from '@/features/uploads/uploadsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import {
    mockClearErrors,
    mockFieldError,
    mockFile,
    mockImageUrl1,
    mockRegister,
    mockSetValue,
} from '@/tests/mocks/form'
import { ImageUrlSection, type ImageUrlSectionProps } from '../ImageUrlSection'

vi.mock('@/features/uploads/uploadsApi')
vi.mock('@/shared/utils/errorUtils')
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

    const spyConsoleError = vi.spyOn(console, 'error')

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

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

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('renders with required props', () => {
        render(<ImageUrlSection {...mockProps} />)

        expect(screen.getByText('Image Url')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Image Url')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<ImageUrlSection {...mockProps} description={mockDescription} />)

        expect(screen.getByText(mockDescription)).toHaveClass(/description/)
    })

    it('renders error message', () => {
        render(
            <ImageUrlSection {...mockProps} error={mockFieldError.message} />
        )

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
    })

    it('renders image preview if value is provided', () => {
        render(<ImageUrlSection {...mockProps} value={mockImageUrl1} />)

        const image = screen.getByTestId(
            'mocked-image-preview'
        ) as HTMLImageElement

        expect(image.src).toBe(mockImageUrl1)
    })

    describe('File Upload', () => {
        it('uploads file successfully', async () => {
            render(<ImageUrlSection {...mockProps} />)

            const input = screen.getByLabelText('', {
                selector: 'input[type="file"]',
            })

            await waitFor(() =>
                fireEvent.change(input, { target: { files: [mockFile] } })
            )

            expect(mockUploadTempImageByFile).toHaveBeenCalledTimes(1)
            expect(mockSetValue).toHaveBeenCalledWith('imageUrl', mockImageUrl1)
            expect(mockClearErrors).toHaveBeenCalledWith('imageUrl')
        })

        it('handles file upload error', async () => {
            mockUnwrapByFile.mockRejectedValue(mockError)

            render(<ImageUrlSection {...mockProps} />)

            const input = screen.getByLabelText('', {
                selector: 'input[type="file"]',
            })

            await waitFor(() =>
                fireEvent.change(input, { target: { files: [mockFile] } })
            )

            expect(mockSetValue).toHaveBeenCalledWith('imageUrl', '')
            expect(mockUploadTempImageByFile).toHaveBeenCalledOnce()
            expect(mockClearErrors).not.toHaveBeenCalled()
            expect(toast.error).toHaveBeenCalledWith(mockError.message)
        })

        it('does nothing when file is empty', async () => {
            render(<ImageUrlSection {...mockProps} />)

            const input = screen.getByLabelText('', {
                selector: 'input[type="file"]',
            })

            await waitFor(() =>
                fireEvent.change(input, { target: { files: [] } })
            )

            expect(mockUploadTempImageByFile).not.toHaveBeenCalled()
            expect(mockSetValue).not.toHaveBeenCalled()
        })
    })

    describe('URL Paste Handling', () => {
        it('uploads image by pasted url', async () => {
            render(<ImageUrlSection {...mockProps} />)

            const textarea = screen.getByPlaceholderText('Image Url')

            const pasteEvent = {
                clipboardData: {
                    getData: () => mockImageUrl1,
                },
            } as unknown as ClipboardEvent

            await waitFor(() => fireEvent.paste(textarea, pasteEvent))

            expect(mockUploadTempImageByUrl).toHaveBeenCalledWith({
                folder: 'products',
                imageUrl: mockImageUrl1,
            })

            expect(mockSetValue).toHaveBeenCalledWith('imageUrl', mockImageUrl1)
        })

        it('does not upload when pasted URL is invalid', async () => {
            render(<ImageUrlSection {...mockProps} />)

            const textarea = screen.getByPlaceholderText('Image Url')

            const pasteEvent = {
                clipboardData: {
                    getData: () => 'invalid_url',
                },
            } as unknown as ClipboardEvent

            await waitFor(() => fireEvent.paste(textarea, pasteEvent))

            expect(mockUploadTempImageByUrl).not.toHaveBeenCalled()
        })

        it('handles URL upload error on paste', async () => {
            mockUnwrapByUrl.mockRejectedValue(mockError)

            render(<ImageUrlSection {...mockProps} />)

            const textarea = screen.getByRole('textbox')

            const pasteEvent = {
                clipboardData: {
                    getData: () => mockImageUrl1,
                },
            } as unknown as ClipboardEvent

            await waitFor(() => fireEvent.paste(textarea, pasteEvent))

            expect(mockUploadTempImageByUrl).toHaveBeenCalledOnce()
            expect(mockClearErrors).not.toHaveBeenCalled()
            expect(toast.error).toHaveBeenCalledWith(mockError.message)
        })
    })
})
