import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { type QuestionnaireOption } from '../../../questionnaires/options'
import { CheckboxItemProps } from '../CheckboxItem'
import { CheckboxSection, type CheckboxSectionProps } from '../CheckboxSection'
import { LabelProps } from '../Label'

vi.mock('../CheckboxItem', () => ({
    CheckboxItem: ({ id, label, register }: CheckboxItemProps) => (
        <div data-testid={`mocked-checkbox-item-${id}`}>
            <span>{label}</span>
            <input type="checkbox" {...register} />
        </div>
    ),
}))

vi.mock('../Label', () => ({
    Label: ({ children, text }: LabelProps) => (
        <label data-testid="mocked-label">
            <span>{text}</span>
            {children}
        </label>
    ),
}))

describe('CheckboxSection', () => {
    const mockOptions: QuestionnaireOption[] = [
        { id: 'option-1', label: 'Option 1', name: 'age' },
        { id: 'option-2', label: 'Option 2', name: 'city' },
        { id: 'option-3', label: 'Option 3', name: 'referral' },
    ]

    const mockProps: CheckboxSectionProps = {
        label: 'Test Label',
        options: mockOptions,
        register: vi.fn(),
    }

    it('renders with the label correctly', () => {
        render(<CheckboxSection {...mockProps} />)

        const label = screen.getByTestId('mocked-label')
        expect(label).toBeInTheDocument()
        expect(label).toHaveTextContent(mockProps.label)
    })

    it('renders all options as checkbox items', () => {
        render(<CheckboxSection {...mockProps} />)

        const option1 = screen.getByTestId('mocked-checkbox-item-option-1')
        const option2 = screen.getByTestId('mocked-checkbox-item-option-2')
        const option3 = screen.getByTestId('mocked-checkbox-item-option-3')

        expect(option1).toBeInTheDocument()
        expect(option2).toBeInTheDocument()
        expect(option3).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<CheckboxSection {...mockProps} description={mockDescription} />)

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('does not render description when not provided', () => {
        render(<CheckboxSection {...mockProps} />)

        const description = screen.queryByText(/description/i)

        expect(description).not.toBeInTheDocument()
        expect(document.querySelector('.form-description')).toBeNull()
    })
})
