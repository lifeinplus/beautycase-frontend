import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useCreateMakeupBagQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { MakeupBagQuestionnaireCreate } from './MakeupBagQuestionnaireCreate'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock('@/shared/components/forms/checkbox/section/CheckboxSection')
vi.mock('@/shared/components/forms/input/section/InputSection')
vi.mock('@/shared/components/forms/image/text-section/ImageTextSection')
vi.mock('@/shared/components/forms/radio-button/section/RadioButtonSection')
vi.mock('@/shared/components/forms/textarea/section/TextareaSection')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/shared/components/common/hero/Hero')

describe('MakeupBagQuestionnaireCreate', () => {
    const mockAddQuestionnaire = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(
            useCreateMakeupBagQuestionnaireMutation as Mock
        ).mockReturnValue([mockAddQuestionnaire, { isLoading: false }])

        mockAddQuestionnaire.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders all required form fields', () => {
        render(<MakeupBagQuestionnaireCreate />)

        const placeholders = [
            'fields.name.label',
            'fields.instagram.label',
            'fields.city.label',
            'fields.age.label',
            'fields.makeupBag.label',
            'fields.procedures.label',
            'fields.skinType.label',
            'fields.allergies.label',
            'fields.peeling.label',
            'fields.pores.label',
            'fields.oilyShine.label',
            'fields.currentSkills.label',
            'fields.desiredSkills.label',
            'fields.makeupTime.label',
            'fields.budget.label',
            'fields.brushes.label',
            'fields.problems.label',
            'fields.referral.label',
        ]

        placeholders.forEach((placeholder) => {
            expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
        })
    })

    it('calls addQuestionnaire and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<MakeupBagQuestionnaireCreate />)

        await user.type(
            screen.getByPlaceholderText(
                makeupBagQuestionnaireQuestions.name.label
            ),
            mockQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(
                makeupBagQuestionnaireQuestions.makeupBag.label
            ),
            mockQuestionnaire1.makeupBag
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockAddQuestionnaire).toHaveBeenCalledWith({
            name: mockQuestionnaire1.name,
            makeupBag: mockQuestionnaire1.makeupBag,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/confirmation')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagQuestionnaireCreate />)

        await user.type(
            screen.getByPlaceholderText(
                makeupBagQuestionnaireQuestions.name.label
            ),
            mockQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(
                makeupBagQuestionnaireQuestions.makeupBag.label
            ),
            mockQuestionnaire1.makeupBag
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockAddQuestionnaire).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
