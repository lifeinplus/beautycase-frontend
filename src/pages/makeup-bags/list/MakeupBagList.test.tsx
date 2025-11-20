import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockMakeupBags } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import { useGetMineMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { MakeupBagList } from './MakeupBagList'

vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/components/mobile-view/MakeupBagMobileView')
vi.mock('@/features/makeup-bags/components/table/MakeupBagTable')
vi.mock('@/shared/components/layout/header/Header')

describe('MakeupBagList', () => {
    beforeEach(() => {
        vi.mocked(useGetMineMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        renderWithProviders(<MakeupBagList />)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getAllByText(/hero.headline/)).toHaveLength(2)
    })

    it('renders page components and list views', () => {
        renderWithProviders(<MakeupBagList />)

        expect(
            screen.getByTestId('mocked-makeup-bag-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-makeup-bag-table')
        ).toBeInTheDocument()
    })
})
