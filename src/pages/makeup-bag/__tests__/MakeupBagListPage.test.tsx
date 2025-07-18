import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockMakeupBags } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { useGetAllMakeupBagsQuery } from '@/features/makeupBags/makeupBagsApi'
import { MakeupBagListPage } from '../MakeupBagListPage'

vi.mock('@/features/makeupBags/components/MakeupBagMobileView')
vi.mock('@/features/makeupBags/components/MakeupBagTable')
vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/Header')

describe('MakeupBagListPage', () => {
    beforeEach(() => {
        vi.mocked(useGetAllMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<MakeupBagListPage />)

        const ids = ['mocked-header', 'mocked-hero', 'mocked-data-wrapper']

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('renders page components and list views', () => {
        render(<MakeupBagListPage />)

        expect(
            screen.getByTestId('mocked-makeup-bag-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-makeup-bag-table')
        ).toBeInTheDocument()
    })
})
