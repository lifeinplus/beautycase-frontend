import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockMakeupBagQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useCreateMakeupBagQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { MakeupBagQuestionnaireCreate } from './MakeupBagQuestionnaireCreate'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock('@/shared/components/forms/checkbox/section/CheckboxSection')
vi.mock('@/shared/components/forms/image/text-section/ImageTextSection')
vi.mock('@/shared/components/forms/radio-button/section/RadioButtonSection')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/top-panel/TopPanel')

describe('MakeupBagQuestionnaireCreate', () => {
    const mockCreate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(
            useCreateMakeupBagQuestionnaireMutation as Mock
        ).mockReturnValue([mockCreate, { isLoading: false }])

        mockCreate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders all required form fields', () => {
        render(<MakeupBagQuestionnaireCreate />)

        const placeholders = [
            'makeupBag.fields.name.label',
            'makeupBag.fields.instagram.label',
            'makeupBag.fields.city.label',
            'makeupBag.fields.age.label',
            'makeupBag.fields.makeupBag.label',
            'makeupBag.fields.procedures.label',
            'makeupBag.fields.skinType.label',
            'makeupBag.fields.allergies.label',
            'makeupBag.fields.peeling.label',
            'makeupBag.fields.pores.label',
            'makeupBag.fields.oilyShine.label',
            'makeupBag.fields.currentSkills.label',
            'makeupBag.fields.desiredSkills.label',
            'makeupBag.fields.makeupTime.label',
            'makeupBag.fields.budget.label',
            'makeupBag.fields.brushes.label',
            'makeupBag.fields.problems.label',
            'makeupBag.fields.referral.label',
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
            mockMakeupBagQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(
                makeupBagQuestionnaireQuestions.makeupBag.label
            ),
            mockMakeupBagQuestionnaire1.makeupBag
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockCreate).toHaveBeenCalledWith({
            name: mockMakeupBagQuestionnaire1.name,
            makeupBag: mockMakeupBagQuestionnaire1.makeupBag,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/confirmation')
    })

    it('calls navigate when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagQuestionnaireCreate />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
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
            mockMakeupBagQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(
                makeupBagQuestionnaireQuestions.makeupBag.label
            ),
            mockMakeupBagQuestionnaire1.makeupBag
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockCreate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
