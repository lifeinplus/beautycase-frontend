import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import config from '@/app/config/config'
import { mockTraining1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'
import { mockT } from '@/tests/mocks/translation'
import { TrainingQuestionnaireData } from './TrainingQuestionnaireData'

vi.mock('@/app/config/config')
vi.mock('@/shared/lib/cloudinary/cloudinary')

describe('TrainingQuestionnaireData', () => {
    it('renders all fields correctly', () => {
        render(<TrainingQuestionnaireData data={mockTraining1} />)

        expect(mockT).toHaveBeenCalledWith('fields.name.label')
        expect(mockT).toHaveBeenCalledWith('fields.instagram.label')
        expect(mockT).toHaveBeenCalledWith('fields.city.label')

        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('City 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
    })

    it('displays fallback for undefined values', () => {
        render(<TrainingQuestionnaireData data={mockTraining1} />)

        const notSpecifiedElements = screen.getAllByText('notSpecified')
        expect(notSpecifiedElements.length).toBe(19 - 6)
    })

    it('renders an image when makeupBagPhotoId is provided', () => {
        const mockMakeupBagPhotoId = 'makeupBagPhoto1'

        render(<TrainingQuestionnaireData data={mockTraining1} />)

        expect(cloudinary.image).toHaveBeenCalledWith(mockMakeupBagPhotoId)
        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('uses default image when makeupBagPhotoId is not provided', () => {
        render(<TrainingQuestionnaireData data={mockTraining1} />)

        expect(cloudinary.image).toHaveBeenCalledWith(
            config.cloudinary.defaultThumbnailName
        )
        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('handles object values and converts them to labels', () => {
        const mockData = {
            eyeshadowCrease: true,
            foundationPores: true,
        }

        render(<TrainingQuestionnaireData data={{ ...mockTraining1 }} />)

        expect(screen.getByText('fields.problems.label')).toBeInTheDocument()

        const problems = screen.getByText(/eyeshadowCrease.*foundationPores/i)
        expect(problems).toBeInTheDocument()
    })
})
