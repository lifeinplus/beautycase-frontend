import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockTrainingQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { mockT } from '@/tests/mocks/translation'
import { TrainingQuestionnaireData } from './TrainingQuestionnaireData'

vi.mock('@/app/config/config')
vi.mock('@/shared/lib/cloudinary/cloudinary')

describe('TrainingQuestionnaireData', () => {
    it('renders all fields correctly', () => {
        render(<TrainingQuestionnaireData data={mockTrainingQuestionnaire1} />)

        expect(mockT).toHaveBeenCalledWith('training.fields.name.label')
        expect(mockT).toHaveBeenCalledWith('training.fields.contact.label')
        expect(mockT).toHaveBeenCalledWith('training.fields.experience.label')
        expect(mockT).toHaveBeenCalledWith('training.fields.difficulties.label')
        expect(mockT).toHaveBeenCalledWith('training.fields.expectations.label')

        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
        expect(screen.getByText('I want to learn makeup')).toBeInTheDocument()
    })

    it('displays fallback for undefined values', () => {
        render(<TrainingQuestionnaireData data={mockTrainingQuestionnaire1} />)

        const notSpecifiedElements = screen.getAllByText('notSpecified')
        expect(notSpecifiedElements.length).toBe(5 - 3)
    })
})
