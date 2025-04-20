import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { renderWithRouter } from '../../../tests/mocks/wrappers'
import { formatDate } from '../../../utils/date'
import { MobileView } from '../MobileView'

vi.mock('../../../utils/date', () => ({
    formatDate: vi.fn((_, format) => {
        if (format === 'yyyy.MM.dd HH:mm') return '2025.04.10 14:30'
        if (format === 'yyyy.MM.dd') return '2025.04.10'
        if (format === 'HH:mm') return '14:30'
        return 'formatted-date'
    }),
}))

interface TestItem {
    id: string
    title: string
    subtitle?: string
    createdAt?: string
}

describe('MobileView', () => {
    const mockItems: TestItem[] = [
        {
            id: '1',
            title: 'Item 1',
            subtitle: 'Subtitle 1',
            createdAt: '2025-02-26T19:00:01.993+00:00',
        },
        {
            id: '2',
            title: 'Item 2',
            subtitle: 'Subtitle 2',
            createdAt: '2025-03-02T12:52:12.075+00:00',
        },
        {
            id: '3',
            title: 'Item 3',
        },
    ]

    const getTitle = (item: TestItem) => item.title
    const getSubtitle = (item: TestItem) => item.subtitle || '—'
    const getDate = (item: TestItem) =>
        formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')
    const getLink = (item: TestItem) => `/items/${item.id}`

    it('renders nothing when items are undefined', () => {
        const { container } = renderWithRouter(
            <MobileView getTitle={getTitle} getLink={getLink} />
        )

        expect(container.querySelector('.space-y-5')).toBeInTheDocument()
        expect(container.querySelectorAll('a').length).toBe(0)
    })

    it('renders the component with sm:hidden class', () => {
        const { container } = renderWithRouter(
            <MobileView
                items={mockItems}
                getTitle={getTitle}
                getLink={getLink}
            />
        )

        const containerDiv = container.querySelector('.space-y-5')
        expect(containerDiv).toHaveClass('sm:hidden')
    })

    it('renders all items with title', () => {
        renderWithRouter(
            <MobileView
                items={mockItems}
                getTitle={getTitle}
                getLink={getLink}
            />
        )

        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
        expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('renders all items even no subtitle is provided', () => {
        renderWithRouter(
            <MobileView
                items={mockItems}
                getTitle={getTitle}
                getSubtitle={getSubtitle}
                getLink={getLink}
            />
        )

        expect(screen.getByText('Subtitle 1')).toBeInTheDocument()
        expect(screen.getByText('Subtitle 2')).toBeInTheDocument()
        expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('renders all items even no date is provided', () => {
        renderWithRouter(
            <MobileView
                items={mockItems}
                getTitle={getTitle}
                getDate={getDate}
                getLink={getLink}
            />
        )

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(3)
    })

    it('renders links with correct URLs', () => {
        renderWithRouter(
            <MobileView
                items={mockItems}
                getTitle={getTitle}
                getLink={getLink}
            />
        )

        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(mockItems.length)

        expect(links[0]).toHaveAttribute('href', '/items/1')
        expect(links[1]).toHaveAttribute('href', '/items/2')
        expect(links[2]).toHaveAttribute('href', '/items/3')
    })

    it('renders chevron icons for all items', () => {
        renderWithRouter(
            <MobileView
                items={mockItems}
                getTitle={getTitle}
                getLink={getLink}
            />
        )

        const icons = screen.getAllByTestId('mocked-chevron-right-icon')
        expect(icons).toHaveLength(3)
    })
})
