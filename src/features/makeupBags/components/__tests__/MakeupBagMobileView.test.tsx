import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { type MobileViewProps } from '../../../../components/table/MobileView'
import { mockMakeupBags } from '../../../../tests/mocks/handlers/makeupBagsHandlers'
import type { MakeupBag } from '../../types'
import { MakeupBagMobileView } from '../MakeupBagMobileView'

vi.mock('../../../../components/table/MobileView', () => ({
    MobileView: ({
        items,
        getTitle,
        getSubtitle,
        getDate,
        getLink,
    }: MobileViewProps<MakeupBag>) => (
        <div data-testid="mocked-mobile-view">
            {items?.map((item, i) => (
                <a key={i} href={getLink(item)}>
                    {getTitle && <div>{getTitle(item)}</div>}
                    {getSubtitle && <div>{getSubtitle(item)}</div>}
                    {getDate && <div>{getDate(item)}</div>}
                </a>
            ))}
        </div>
    ),
}))

vi.mock('../../../../utils/date', () => ({
    formatDate: vi.fn((_, format) => {
        if (format === 'yyyy.MM.dd HH:mm') return '2025.04.10 14:30'
        if (format === 'yyyy.MM.dd') return '2025.04.10'
        if (format === 'HH:mm') return '14:30'
        return 'formatted-date'
    }),
}))

describe('MakeupBagMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(<MakeupBagMobileView makeupBags={mockMakeupBags} />)

        const mobileView = screen.getByTestId('mocked-mobile-view')
        const dates = screen.getAllByText('2025.04.10 14:30')
        const title = screen.getByText('Test Client 1')
        const subtitle = screen.getByText('Test Category 1')

        expect(mobileView).toBeInTheDocument()
        expect(dates).toHaveLength(2)
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
