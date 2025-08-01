import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockMakeupBags } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { useGetAllMakeupBagsQuery } from '@/features/makeupBags/makeupBagsApi'
import { MakeupBagList } from './MakeupBagList'

vi.mock('@/features/makeupBags/components/MakeupBagMobileView')
vi.mock('@/features/makeupBags/components/MakeupBagTable')
vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/Header')

describe('MakeupBagList', () => {
    beforeEach(() => {
        vi.mocked(useGetAllMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<MakeupBagList />)

        const ids = ['mocked-header', 'mocked-hero', 'mocked-data-wrapper']

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('renders page components and list views', () => {
        render(<MakeupBagList />)

        expect(
            screen.getByTestId('mocked-makeup-bag-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-makeup-bag-table')
        ).toBeInTheDocument()
    })
})
