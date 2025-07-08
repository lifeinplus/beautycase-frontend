import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
    mockFieldError,
    mockImageUrl1,
    mockRegister,
    mockRegisterVideo,
    mockYouTubeUrl,
} from '@/tests/mocks/form'
import type { TextareaSectionProps } from '../TextareaSection'
import { TextareaSection } from '../TextareaSection'

vi.mock('../ImagePreview')
vi.mock('../Label')

describe('TextareaSection', () => {
    const mockProps: TextareaSectionProps = {
        label: 'Test Label',
        register: mockRegister,
    }

    it('renders with the label correctly', () => {
        render(<TextareaSection {...mockProps} />)

        expect(screen.getByTestId('mocked-label')).toHaveTextContent(
            mockProps.label
        )

        expect(screen.getByPlaceholderText(mockProps.label)).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<TextareaSection {...mockProps} description={mockDescription} />)

        expect(screen.getByText(mockDescription)).toHaveClass(/description/)
    })

    it('renders error message and borderError class if error is provided', () => {
        render(
            <TextareaSection {...mockProps} error={mockFieldError.message} />
        )

        expect(screen.getByText(mockFieldError.message!)).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toHaveClass(/borderError/)
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
