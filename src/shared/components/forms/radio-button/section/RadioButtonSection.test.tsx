import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type {
    MakeupBagQuestionnaire,
    QuestionnaireOption,
} from '@/features/questionnaires/types'
import { UseFormRegisterReturn } from 'react-hook-form'
import {
    RadioButtonSection,
    type RadioButtonSectionProps,
} from './RadioButtonSection'

describe('RadioButtonSection', () => {
    const mockOptions: QuestionnaireOption<MakeupBagQuestionnaire>[] = [
        { id: 'option-1', label: 'Option 1', name: 'age', value: 'value1' },
        { id: 'option-2', label: 'Option 2', name: 'brushes', value: 'value2' },
        { id: 'option-3', label: 'Option 3', name: 'city', value: 'value3' },
    ]

    const mockProps: RadioButtonSectionProps<MakeupBagQuestionnaire> = {
        label: 'Test Label',
        options: mockOptions,
        register: {
            onChange: vi.fn(),
            onBlur: vi.fn(),
            name: 'mock-name',
            ref: vi.fn(),
        } as unknown as UseFormRegisterReturn,
        t: (key) => key,
    }

    it('renders label and radio buttons', () => {
        render(<RadioButtonSection {...mockProps} />)

        expect(screen.getByText(mockProps.label)).toBeInTheDocument()
        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(screen.getByText('Option 2')).toBeInTheDocument()
        expect(screen.getByText('Option 3')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(
            <RadioButtonSection {...mockProps} description={mockDescription} />
        )

        expect(screen.getByText(mockDescription)).toBeInTheDocument()
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
