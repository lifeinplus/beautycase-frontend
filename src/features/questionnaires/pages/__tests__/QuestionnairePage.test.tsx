import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { mockQuestionnaire } from '../../__mocks__/questionnairesApi'
import { useCreateQuestionnaireMutation } from '../../questionnairesApi'
import { questions } from '../../utils'
import { QuestionnairePage } from '../QuestionnairePage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/components/CheckboxSection')
vi.mock('../../../form/components/InputSection')
vi.mock('../../../form/components/ImageTextSection')
vi.mock('../../../form/components/RadioButtonSection')
vi.mock('../../../form/components/TextareaSection')
vi.mock('../../questionnairesApi')

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
            'Имя',
            'Instagram',
            'Город',
            'Возраст',
            'Содержимое косметички',
            'Процедуры',
            'Тип кожи',
            'Аллергии',
            'Шелушения',
            'Поры',
            'Жирный блеск',
            'Текущие навыки',
            'Желаемые навыки',
            'Время на макияж',
            'Бюджет',
            'Подбор кистей',
            'Проблемы при макияже',
            'Источник',
        ]

        placeholders.forEach((placeholder) => {
            expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
        })
    })

    it('calls addQuestionnaire and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<QuestionnairePage />)

        const name = screen.getByPlaceholderText(questions.name.label)
        const makeupBag = screen.getByPlaceholderText(questions.makeupBag.label)
        const button = screen.getByText('Отправить')

        await user.type(name, mockQuestionnaire.name)
        await user.type(makeupBag, mockQuestionnaire.makeupBag)
        await user.click(button)

        expect(mockAddQuestionnaire).toHaveBeenCalledWith({
            name: mockQuestionnaire.name,
            makeupBag: mockQuestionnaire.makeupBag,
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

        const name = screen.getByPlaceholderText(questions.name.label)
        const makeupBag = screen.getByPlaceholderText(questions.makeupBag.label)
        const button = screen.getByText('Отправить')

        await user.type(name, mockQuestionnaire.name)
        await user.type(makeupBag, mockQuestionnaire.makeupBag)
        await user.click(button)

        expect(mockAddQuestionnaire).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
