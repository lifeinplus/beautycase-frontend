import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    mockFieldError,
    mockImageUrl1,
    mockRegister,
    mockRegisterVideo,
    mockYouTubeUrl,
} from '@/tests/mocks/form'
import { TextareaSection, type TextareaSectionProps } from './TextareaSection'

describe('TextareaSection', () => {
    const mockProps: TextareaSectionProps = {
        label: 'Test Label',
        register: mockRegister,
    }

    it('renders with the label correctly', () => {
        render(<TextareaSection {...mockProps} />)

        expect(screen.getByText(mockProps.label)).toBeInTheDocument()

        expect(screen.getByPlaceholderText(mockProps.label)).toBeInTheDocument()
    })

    it('renders error message and error class if error is provided', () => {
        render(
            <TextareaSection {...mockProps} error={mockFieldError.message} />
        )

        expect(screen.getByText(mockFieldError.message!)).toBeInTheDocument()
    })

    it('renders image preview if preview and value are provided', () => {
        render(<TextareaSection {...mockProps} preview value={mockImageUrl1} />)

        const image = screen.getByRole('img') as HTMLImageElement

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

        const image = screen.getByRole('img') as HTMLImageElement

        expect(image).toBeInTheDocument()
        expect(image.src).toContain('img.youtube.com')
    })
})
