import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { setFormData } from '@/features/form/formSlice'
import { mockMakeupBags } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { useGetAllMakeupBagsQuery } from '@/features/makeupBags/makeupBagsApi'
import { mockStages } from '@/features/stages/__mocks__/stagesApi'
import { useGetAllStagesQuery } from '@/features/stages/stagesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { StageSelection } from './StageSelection'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/ui/Image')

describe('StageSelection', () => {
    const mockFormData = {
        makeupBagId: 'makeupBag1',
        stageIds: ['stage2'],
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        vi.mocked(useGetAllMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
        })

        vi.mocked(useGetAllStagesQuery as Mock).mockReturnValue({
            data: mockStages,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page with title', () => {
        render(<StageSelection />)

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: 'titles.selection',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: 'titles.selection',
            })
        ).toBeInTheDocument()
    })

    it('renders stage items', () => {
        render(<StageSelection />)

        const stage1 = screen.getByAltText(mockStages[0].title)
        const stage2 = screen.getByAltText(mockStages[1].title)

        expect(stage1).toBeInTheDocument()
        expect(stage2).toBeInTheDocument()
    })

    it('toggles stage selection on click', async () => {
        const user = userEvent.setup()

        render(<StageSelection />)

        const imgContainers = screen
            .getAllByTestId('mocked-image')
            .map((img) => img.parentElement)

        await user.click(imgContainers[0]!)

        const selected = document.querySelectorAll("[class*='numbered']")
        expect(selected.length).toBe(2)

        await user.click(imgContainers[1]!)

        const finalSelected = document.querySelectorAll("[class*='numbered']")
        expect(finalSelected.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageSelection />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageSelection />)

        await user.click(screen.getByText('navigation:actions.save'))

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

        const selected = document.querySelectorAll("[class*='numbered']")
        expect(selected.length).toBe(0)
    })
})
