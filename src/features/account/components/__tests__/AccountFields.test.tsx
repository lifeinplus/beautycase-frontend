import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    mockUserLesson1,
    mockUserLesson2,
    mockUserMakeupBag1,
    mockUserMakeupBag2,
    mockUserResult,
} from '@/features/users/__mocks__/usersApi'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'
import { AccountFields } from '../AccountFields'

describe('AccountFields', () => {
    it('renders user data correctly', () => {
        renderWithProviderAndRouter(<AccountFields data={mockUserResult} />)

        const matchers = [
            'fields.username.label',
            'fields.role.label',
            mockUserResult.user.username,
            `fields.role.types.${mockUserResult.user.role}`,
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())
    })

    it('renders makeup bags section with a link', () => {
        const { name: name1 } = mockUserMakeupBag1.category
        const { name: name2 } = mockUserMakeupBag2.category

        renderWithProviderAndRouter(<AccountFields data={mockUserResult} />)

        expect(screen.getByText('fields.makeupBags.label')).toBeInTheDocument()

        expect(
            screen.getByText(`makeupBag:categories.${name1}.full`)
        ).toBeInTheDocument()

        expect(
            screen.getByText(`makeupBag:categories.${name2}.full`)
        ).toBeInTheDocument()

        const links = screen.getAllByRole('link', {
            name: 'fields.makeupBags.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/makeup-bag/makeupBag1')
        expect(links[1]).toHaveAttribute('href', '/makeup-bag/makeupBag2')
    })

    it('handles empty makeup bags', () => {
        const mockData = { ...mockUserResult, makeupBags: [] }

        renderWithProviderAndRouter(<AccountFields data={mockData} />)

        expect(
            screen.getByText('fields.makeupBags.emptyMessage')
        ).toBeInTheDocument()
    })

    it('renders lessons section with a link', () => {
        renderWithProviderAndRouter(<AccountFields data={mockUserResult} />)

        const matchers = [
            'fields.lessons.label',
            mockUserLesson1.title,
            mockUserLesson2.title,
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())

        const links = screen.getAllByRole('link', {
            name: 'fields.lessons.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/lessons/lesson1')
        expect(links[1]).toHaveAttribute('href', '/lessons/lesson2')
    })

    it('handles empty lessons', () => {
        const mockData = { ...mockUserResult, lessons: [] }

        renderWithProviderAndRouter(<AccountFields data={mockData} />)

        expect(
            screen.getByText('fields.lessons.emptyMessage')
        ).toBeInTheDocument()
    })
})
