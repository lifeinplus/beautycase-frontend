import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import config from '../../../../config'
import cloudinary from '../../../../utils/cloudinary'
import { mockQuestionnaire } from '../../__mocks__/questionnairesApi'
import { QuestionnaireResult } from '../QuestionnaireResult'

vi.mock('../../../../config')
vi.mock('../../../../utils/cloudinary')

describe('QuestionnaireResult', () => {
    it('renders all fields correctly', () => {
        render(<QuestionnaireResult data={mockQuestionnaire} />)

        expect(screen.getByText('Имя')).toBeInTheDocument()
        expect(screen.getByText('Instagram')).toBeInTheDocument()
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('City 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
    })

    it('displays "Не указано" for undefined values', () => {
        render(<QuestionnaireResult data={mockQuestionnaire} />)

        const notSpecifiedElements = screen.getAllByText('Не указано')
        expect(notSpecifiedElements.length).toBe(19 - 6)
    })

    it('renders an image when makeupBagPhotoId is provided', () => {
        const mockMakeupBagPhotoId = 'makeupBagPhoto1'

        render(
            <QuestionnaireResult
                data={{
                    ...mockQuestionnaire,
                    makeupBagPhotoId: mockMakeupBagPhotoId,
                }}
            />
        )

        expect(cloudinary.image).toHaveBeenCalledWith(mockMakeupBagPhotoId)
        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('uses default image when makeupBagPhotoId is not provided', () => {
        render(<QuestionnaireResult data={mockQuestionnaire} />)

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
            <QuestionnaireResult
                data={{ ...mockQuestionnaire, problems: mockData }}
            />
        )

        const problemsElement = screen.getByText(/тени.*тон/i)

        expect(screen.getByText(/Проблемы/i)).toBeInTheDocument()
        expect(problemsElement).toBeInTheDocument()
    })
})
