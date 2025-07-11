import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import {
    mockMakeupBag1,
    mockMakeupBags,
} from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { useGetAllMakeupBagsQuery } from '@/features/makeupBags/makeupBagsApi'
import { mockStage1, mockStages } from '../../__mocks__/stagesApi'
import { StageFilter } from '../StageFilter'

vi.mock('@/features/makeupBags/makeupBagsApi')

describe('StageFilter', () => {
    const mockOnFilterChange = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetAllMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
        })
    })

    it('renders select dropdown with makeup bag options', () => {
        const category = `makeupBag:categories.${mockMakeupBag1.category?.name}.short`
        const client = mockMakeupBag1.client?.username

        render(
            <StageFilter
                onFilterChange={mockOnFilterChange}
                stages={mockStages}
            />
        )

        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByText('noMakeupBag')).toBeInTheDocument()
        expect(screen.getByText(`${category} - ${client}`)).toBeInTheDocument()
    })

    it('handles empty makeup bags list correctly', () => {
        vi.mocked(useGetAllMakeupBagsQuery as Mock).mockReturnValue({
            data: [],
        })

        render(
            <StageFilter
                onFilterChange={mockOnFilterChange}
                stages={mockStages}
            />
        )

        const combobox = screen.getByRole('combobox')
        expect(combobox).toBeInTheDocument()
        expect(combobox).toHaveValue('noMakeupBag')

        expect(mockOnFilterChange).not.toHaveBeenCalled()
    })

    it('filters stages correctly when a makeup bag is selected', async () => {
        const user = userEvent.setup()

        render(
            <StageFilter
                onFilterChange={mockOnFilterChange}
                stages={mockStages}
            />
        )

        mockOnFilterChange.mockReset()

        const select = screen.getByRole('combobox')
        await user.selectOptions(select, 'makeupBag1')

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
        expect(mockOnFilterChange).toHaveBeenLastCalledWith([mockStage1])
    })
})
