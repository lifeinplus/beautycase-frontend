import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    mockUserLesson1,
    mockUserLesson2,
    mockUserMakeupBag1,
    mockUserMakeupBag2,
    mockUserResult,
} from '@/features/users/api/__mocks__/usersApi'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'
import { UserFields } from './UserFields'

describe('UserFields', () => {
    it('renders user data correctly', () => {
        renderWithProviderAndRouter(<UserFields data={mockUserResult} />)

        const matchers = [
            'table.createdAt',
            'table.updatedAt',
            'account:fields.makeupBags.label',
            'account:fields.lessons.label',
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())
    })

    it('renders makeup bags section with a link', () => {
        const { name: name1 } = mockUserMakeupBag1.category
        const { name: name2 } = mockUserMakeupBag2.category

        renderWithProviderAndRouter(<UserFields data={mockUserResult} />)

        expect(
            screen.getByText('account:fields.makeupBags.label')
        ).toBeInTheDocument()

        expect(
            screen.getByText(`makeupBag:categories.${name1}.full`)
        ).toBeInTheDocument()

        expect(
            screen.getByText(`makeupBag:categories.${name2}.full`)
        ).toBeInTheDocument()

        const links = screen.getAllByRole('link', {
            name: 'account:fields.makeupBags.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/makeup-bags/makeupBag1')
        expect(links[1]).toHaveAttribute('href', '/makeup-bags/makeupBag2')
    })

    it('handles empty makeup bags', () => {
        const mockData = { ...mockUserResult, makeupBags: [] }

        renderWithProviderAndRouter(<UserFields data={mockData} />)

        expect(
            screen.getByText('account:fields.makeupBags.emptyMessage')
        ).toBeInTheDocument()
    })

    it('renders lessons section with a link', () => {
        renderWithProviderAndRouter(<UserFields data={mockUserResult} />)

        const matchers = [
            'account:fields.lessons.label',
            mockUserLesson1.title,
            mockUserLesson2.title,
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())

        const links = screen.getAllByRole('link', {
            name: 'account:fields.lessons.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/lessons/lesson1')
        expect(links[1]).toHaveAttribute('href', '/lessons/lesson2')
    })

    it('handles empty lessons', () => {
        const mockData = { ...mockUserResult, lessons: [] }

        renderWithProviderAndRouter(<UserFields data={mockData} />)

        expect(
            screen.getByText('account:fields.lessons.emptyMessage')
        ).toBeInTheDocument()
    })
})
