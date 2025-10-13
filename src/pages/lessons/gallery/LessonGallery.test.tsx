import { screen } from '@testing-library/react'
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    vi,
} from 'vitest'

import { mockLessons } from '@/features/lessons/api/__mocks__/lessonsApi'
import { useGetAllLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { LessonGallery } from './LessonGallery'

vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/widgets/view/gallery/Gallery')

describe('LessonGallery', () => {
    const spyConsoleError = vi.spyOn(console, 'error')

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useGetAllLessonsQuery as Mock).mockReturnValue({
            data: mockLessons,
            isLoading: false,
            error: null,
        })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('renders list of lessons when data is available', () => {
        renderWithRouter(<LessonGallery />)

        expect(screen.getByText(/titles.gallery/i)).toBeInTheDocument()
        expect(screen.getAllByRole('img')).toHaveLength(2)
    })
})
