import { spyConsoleError } from '@/tests/setup'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockMakeupBagQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useCreateMakeupBagQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import { mockMuas } from '@/features/users/api/__mocks__/usersApi'
import { useGetAllMuasQuery } from '@/features/users/api/usersApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { MakeupBagQuestionnaireCreate } from './MakeupBagQuestionnaireCreate'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock('@/features/users/api/usersApi')
vi.mock('@/shared/components/forms/image/text-section/ImageTextSection')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/shared/components/hero/Hero')

describe('MakeupBagQuestionnaireCreate', () => {
    const mockCreate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(
            useCreateMakeupBagQuestionnaireMutation as Mock
        ).mockReturnValue([mockCreate, { isLoading: false }])

        mockCreate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetAllMuasQuery as Mock).mockReturnValue({
            data: mockMuas,
        })
    })

    it('renders all required form fields', () => {
        renderWithProviders(<MakeupBagQuestionnaireCreate />)

        const placeholders = [
            'makeupBag.fields.name.label',
            'makeupBag.fields.instagram.label',
            'makeupBag.fields.city.label',
            'makeupBag.fields.age.label',
            'makeupBag.fields.makeupBag.label',
            'makeupBag.fields.allergies.label',
            'makeupBag.fields.currentSkills.label',
        ]

        placeholders.forEach((placeholder) => {
            expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
        })

        expect(
            screen.getByText('makeupBag.fields.referral.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.brushes.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.budget.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.makeupTime.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.oilyShine.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.pores.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.peeling.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.skinType.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.procedures.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.desiredSkills.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText('makeupBag.fields.problems.label')
        ).toBeInTheDocument()
    })

    it('calls addQuestionnaire and navigates on successful submission', async () => {
        const user = userEvent.setup()

        renderWithProviders(<MakeupBagQuestionnaireCreate />)

        await user.selectOptions(screen.getByRole('combobox'), 'mua-1')

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
            muaId: mockMakeupBagQuestionnaire1.muaId,
            name: mockMakeupBagQuestionnaire1.name,
            makeupBag: mockMakeupBagQuestionnaire1.makeupBag,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/confirmation')
    })

    it('calls navigate when back button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<MakeupBagQuestionnaireCreate />)

        await user.click(
            screen.getAllByRole('navigation')[0].querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        renderWithProviders(<MakeupBagQuestionnaireCreate />)

        await user.selectOptions(screen.getByRole('combobox'), 'mua-1')

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
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
