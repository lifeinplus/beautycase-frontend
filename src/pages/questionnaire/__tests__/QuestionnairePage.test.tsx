import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockQuestionnaire1 } from '@/features/questionnaires/__mocks__/questionnairesApi'
import { useCreateQuestionnaireMutation } from '@/features/questionnaires/questionnairesApi'
import { questions } from '@/features/questionnaires/utils'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { QuestionnairePage } from '../QuestionnairePage'

vi.mock('@/features/questionnaires/questionnairesApi')
vi.mock('@/shared/components/forms/CheckboxSection')
vi.mock('@/shared/components/forms/InputSection')
vi.mock('@/shared/components/forms/ImageTextSection')
vi.mock('@/shared/components/forms/RadioButtonSection')
vi.mock('@/shared/components/forms/TextareaSection')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/layout/Header')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/utils/errorUtils')

describe('QuestionnairePage', () => {
    const mockAddQuestionnaire = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateQuestionnaireMutation as Mock).mockReturnValue([
            mockAddQuestionnaire,
            { isLoading: false },
        ])

        mockAddQuestionnaire.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders all required form fields', () => {
        render(<QuestionnairePage />)

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

        render(<QuestionnairePage />)

        await user.type(
            screen.getByPlaceholderText(questions.name.label),
            mockQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(questions.makeupBag.label),
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

        render(<QuestionnairePage />)

        await user.type(
            screen.getByPlaceholderText(questions.name.label),
            mockQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(questions.makeupBag.label),
            mockQuestionnaire1.makeupBag
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockAddQuestionnaire).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
