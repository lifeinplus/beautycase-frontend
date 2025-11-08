import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { ROUTES } from '@/shared/config/routes'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockLesson1 } from '../../api/__mocks__/lessonsApi'
import { LessonForm } from './LessonForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/features/form/slice/formSlice')

describe('LessonForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockLesson1)
    })

    it('renders all required form fields', () => {
        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()

        const placeholders = [
            'fields.title.label',
            'fields.shortDescription.label',
            'fields.videoUrl.label',
            'fields.fullDescription.label',
        ]

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.lessons.details('123')
        )
    })
})
