import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import {
    mockFieldError,
    mockRegister,
    mockRegisterVideo,
    mockImageUrl1,
    mockYouTubeUrl,
} from '@/tests/mocks/form'
import { TextareaSection, type TextareaSectionProps } from '../TextareaSection'

vi.mock('../ImagePreview')
vi.mock('../Label')

describe('TextareaSection', () => {
    const mockProps: TextareaSectionProps = {
        label: 'Test Label',
        register: mockRegister,
    }

    it('renders with the label correctly', () => {
        render(<TextareaSection {...mockProps} />)

        const label = screen.getByTestId('mocked-label')
        expect(label).toBeInTheDocument()
        expect(label).toHaveTextContent(mockProps.label)

        const textarea = screen.getByPlaceholderText(mockProps.label)
        expect(textarea).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<TextareaSection {...mockProps} description={mockDescription} />)

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('renders error message and border-error class if error is provided', () => {
        render(
            <TextareaSection {...mockProps} error={mockFieldError.message} />
        )

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()

        const textarea = screen.getByRole('textbox')
        expect(textarea).toHaveClass('border-error')
    })

    it('renders image preview if preview and value are provided', () => {
        render(<TextareaSection {...mockProps} preview value={mockImageUrl1} />)

        const image = screen.getByTestId(
            'mocked-image-preview'
        ) as HTMLImageElement

        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockImageUrl1)
    })

    it('renders YouTube thumbnail if preview is enabled and register name is videoUrl', () => {
        render(
            <TextareaSection
                {...mockProps}
                preview
                register={mockRegisterVideo}
                value={mockYouTubeUrl}
            />
        )

        const image = screen.getByTestId(
            'mocked-image-preview'
        ) as HTMLImageElement

        expect(image).toBeInTheDocument()
        expect(image.src).toContain('img.youtube.com')
    })
})
