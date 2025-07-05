import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import type { QuestionnaireOption } from '@/features/questionnaires/options'
import {
    RadioButtonSection,
    type RadioButtonSectionProps,
} from '../RadioButtonSection'

vi.mock('../Label')
vi.mock('../RadioButtonItem')

describe('RadioButtonSection', () => {
    const mockOptions: QuestionnaireOption[] = [
        { id: 'option-1', label: 'Option 1', name: 'age', value: 'value1' },
        { id: 'option-2', label: 'Option 2', name: 'brushes', value: 'value2' },
        { id: 'option-3', label: 'Option 3', name: 'city', value: 'value3' },
    ]

    const mockProps: RadioButtonSectionProps = {
        label: 'Test Label',
        options: mockOptions,
        register: vi.fn(),
    }

    it('renders label and radio buttons', () => {
        render(<RadioButtonSection {...mockProps} />)

        const label = screen.getByTestId('mocked-label')
        expect(label).toBeInTheDocument()
        expect(label).toHaveTextContent(mockProps.label)

        const option1 = screen.getByTestId('mocked-radio-item-option-1')
        const option2 = screen.getByTestId('mocked-radio-item-option-2')
        const option3 = screen.getByTestId('mocked-radio-item-option-3')

        expect(option1).toBeInTheDocument()
        expect(option2).toBeInTheDocument()
        expect(option3).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(
            <RadioButtonSection {...mockProps} description={mockDescription} />
        )

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('handles horizontal layout when horizontal prop is true', () => {
        const { container } = render(
            <RadioButtonSection {...mockProps} horizontal />
        )

        const nav = container.querySelector('nav')

        expect(nav).toHaveClass('flex-row')
        expect(nav).not.toHaveClass('flex-col')
    })

    it('handles vertical layout when horizontal prop is false', () => {
        const { container } = render(<RadioButtonSection {...mockProps} />)

        const nav = container.querySelector('nav')

        expect(nav).toHaveClass('flex-col')
        expect(nav).not.toHaveClass('flex-row')
    })
})
