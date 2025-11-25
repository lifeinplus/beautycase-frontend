import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { setFormData } from '@/features/form/slice/formSlice'
import { mockMakeupBags } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import { useGetMineMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { mockStages } from '@/features/stages/api/__mocks__/stagesApi'
import { useGetMineStagesQuery } from '@/features/stages/api/stagesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { StageSelection } from './StageSelection'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/stages/api/stagesApi')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

describe('StageSelection', () => {
    const mockFormData = {
        makeupBagId: 'makeupBag1',
        stageIds: ['stage2'],
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        vi.mocked(useGetMineMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
        })

        vi.mocked(useGetMineStagesQuery as Mock).mockReturnValue({
            data: mockStages,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page with title', () => {
        render(<StageSelection />)
        expect(screen.getAllByText('titles.selection')).toHaveLength(2)
    })

    it('toggles stage selection on click', async () => {
        const user = userEvent.setup()

        render(<StageSelection />)

        const imgContainers = screen
            .getAllByRole('img')
            .map((img) => img.parentElement)

        await user.click(imgContainers[0]!)

        const selected = document.querySelectorAll(
            "[class*='bg-rose-500 text-white']"
        )

        expect(selected.length).toBe(2)

        await user.click(imgContainers[1]!)

        const finalSelected = document.querySelectorAll(
            "[class*='bg-rose-500 text-white']"
        )

        expect(finalSelected.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageSelection />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageSelection />)

        await user.click(screen.getByText('actions:save'))

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({
                ...mockFormData,
                stageIds: ['stage2'],
            })
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('uses an empty array when there is no stageId', async () => {
        vi.mocked(useAppSelector).mockReturnValue({ stageIds: null })

        render(<StageSelection />)

        const selected = document.querySelectorAll(
            "[class*='bg-rose-500 text-white']"
        )
        expect(selected.length).toBe(0)
    })
})
