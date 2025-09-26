import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockMakeupBag1 } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import { useGetMakeupBagByIdQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagDetails } from './MakeupBagDetails'

vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/components/stages/MakeupBagStages')
vi.mock('@/features/makeup-bags/components/tools/MakeupBagTools')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/footer/Footer')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('./hooks/useMakeupBagDetailsActions')

describe('MakeupBagDetails', () => {
    beforeEach(() => {
        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: mockMakeupBag1,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page with correct data', () => {
        render(<MakeupBagDetails />)

        const ids = [
            'mocked-top-panel',
            'mocked-hero',
            'mocked-makeup-bag-stages',
            'mocked-makeup-bag-tools',
        ]

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('renders the page with no data', () => {
        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        })

        render(<MakeupBagDetails />)

        expect(screen.getByText(/0 stages/)).toBeInTheDocument()
        expect(screen.getByText(/0 tools/)).toBeInTheDocument()
    })
})
