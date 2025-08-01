import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import config from '@/app/config'
import cloudinary from '@/shared/utils/cloudinary'
import { mockT } from '@/tests/mocks/translation'
import { mockQuestionnaire1 } from '../../__mocks__/questionnairesApi'
import { QuestionnaireData } from '../QuestionnaireData'

vi.mock('@/app/config')
vi.mock('@/shared/utils/cloudinary')

describe('QuestionnaireData', () => {
    it('renders all fields correctly', () => {
        render(<QuestionnaireData data={mockQuestionnaire1} />)

        expect(mockT).toHaveBeenCalledWith('fields.name.label')
        expect(mockT).toHaveBeenCalledWith('fields.instagram.label')
        expect(mockT).toHaveBeenCalledWith('fields.city.label')

        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('City 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
    })

    it('displays fallback for undefined values', () => {
        render(<QuestionnaireData data={mockQuestionnaire1} />)

        const notSpecifiedElements = screen.getAllByText('notSpecified')
        expect(notSpecifiedElements.length).toBe(19 - 6)
    })

    it('renders an image when makeupBagPhotoId is provided', () => {
        const mockMakeupBagPhotoId = 'makeupBagPhoto1'

        render(
            <QuestionnaireData
                data={{
                    ...mockQuestionnaire1,
                    makeupBagPhotoId: mockMakeupBagPhotoId,
                }}
            />
        )

        expect(cloudinary.image).toHaveBeenCalledWith(mockMakeupBagPhotoId)
        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('uses default image when makeupBagPhotoId is not provided', () => {
        render(<QuestionnaireData data={mockQuestionnaire1} />)

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

        render(
            <QuestionnaireData
                data={{ ...mockQuestionnaire1, problems: mockData }}
            />
        )

        expect(screen.getByText('fields.problems.label')).toBeInTheDocument()

        const problems = screen.getByText(/eyeshadowCrease.*foundationPores/i)
        expect(problems).toBeInTheDocument()
    })
})
