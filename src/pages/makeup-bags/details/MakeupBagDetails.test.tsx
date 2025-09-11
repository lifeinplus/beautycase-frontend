import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockMakeupBag1 } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { useGetMakeupBagByIdQuery } from '@/features/makeupBags/makeupBagsApi'
import { MakeupBagDetails } from './MakeupBagDetails'

vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/features/stages/components/Stages')
vi.mock('@/features/tools/components/Tools')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/Footer')
vi.mock('@/shared/components/layout/TopPanel')
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
            'mocked-stages',
            'mocked-tools',
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

        expect(screen.getByText(/emptyMessage/)).toBeInTheDocument()
    })
})
