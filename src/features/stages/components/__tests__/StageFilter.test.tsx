import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import {
    mockMakeupBag,
    mockMakeupBags,
} from '../../../makeupBags/__mocks__/makeupBagsApiSlice'
import { useGetMakeupBagsQuery } from '../../../makeupBags/makeupBagsApiSlice'
import { mockStage, mockStages } from '../../__mocks__/stagesApiSlice'
import { StageFilter } from '../StageFilter'

vi.mock('../../../makeupBags/makeupBagsApiSlice')

describe('StageFilter', () => {
    const mockOnFilterChange = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
        })
    })

    it('renders select dropdown with makeup bag options', () => {
        const category = mockMakeupBag.category?.name
        const client = mockMakeupBag.client?.username

        render(
            <StageFilter
                onFilterChange={mockOnFilterChange}
                stages={mockStages}
            />
        )

        const combobox = screen.getByRole('combobox')
        const noMakeupBag = screen.getByText('Без косметички')
        const makeupBag = screen.getByText(`${category} - ${client}`)

        expect(combobox).toBeInTheDocument()
        expect(noMakeupBag).toBeInTheDocument()
        expect(makeupBag).toBeInTheDocument()
    })

    it('handles empty makeup bags list correctly', () => {
        vi.mocked(useGetMakeupBagsQuery as Mock).mockReturnValue({
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

    it('filters stages correctly when a makeup bag is selected', () => {
        render(
            <StageFilter
                onFilterChange={mockOnFilterChange}
                stages={mockStages}
            />
        )

        mockOnFilterChange.mockReset()

        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: 'makeupBag1' } })

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
        expect(mockOnFilterChange).toHaveBeenLastCalledWith([mockStage])
    })
})
