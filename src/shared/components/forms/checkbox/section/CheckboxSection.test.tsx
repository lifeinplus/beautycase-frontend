import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type {
    MakeupBagQuestionnaire,
    QuestionnaireOption,
} from '@/features/questionnaires/types'
import {
    CheckboxSection,
    type CheckboxSectionProps,
} from '../../checkbox/section/CheckboxSection'

describe('CheckboxSection', () => {
    const mockOptions: QuestionnaireOption<MakeupBagQuestionnaire>[] = [
        { id: 'option-1', label: 'Option 1', name: 'age' },
        { id: 'option-2', label: 'Option 2', name: 'city' },
        { id: 'option-3', label: 'Option 3', name: 'referral' },
    ]

    const mockProps: CheckboxSectionProps<MakeupBagQuestionnaire> = {
        label: 'Test Label',
        options: mockOptions,
        register: vi.fn(),
    }

    it('renders with the label correctly', () => {
        render(<CheckboxSection {...mockProps} />)
        expect(screen.getByText(mockProps.label)).toBeInTheDocument()
    })

    it('renders all options as checkbox items', () => {
        render(<CheckboxSection {...mockProps} />)

        expect(screen.getByText(mockOptions[0].label)).toBeInTheDocument()
        expect(screen.getByText(mockOptions[1].label)).toBeInTheDocument()
        expect(screen.getByText(mockOptions[2].label)).toBeInTheDocument()
    })

    it('does not render description when not provided', () => {
        render(<CheckboxSection {...mockProps} />)

        const description = screen.queryByText(/description/i)

        expect(description).not.toBeInTheDocument()
        expect(document.querySelector('.description')).toBeNull()
    })
})
