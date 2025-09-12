import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockMakeupBags } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagList } from './MakeupBagList'

vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/components/mobile-view/MakeupBagMobileView')
vi.mock('@/features/makeup-bags/components/table/MakeupBagTable')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/header/Header')

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

        const ids = ['mocked-header', 'mocked-hero']

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
