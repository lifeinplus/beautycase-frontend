import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { mockMakeupBags } from '../../../makeupBags/__mocks__/makeupBagsApi'
import { useGetMakeupBagsQuery } from '../../../makeupBags/makeupBagsApi'
import { mockStages } from '../../__mocks__/stagesApi'
import { useReadStagesQuery } from '../../stagesApi'
import { StageSelectionPage } from '../StageSelectionPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/Image')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../form/formSlice')
vi.mock('../../../makeupBags/makeupBagsApi')
vi.mock('../../stagesApi')

describe('StageSelectionPage', () => {
    const mockFormData = {
        makeupBagId: 'makeupBag1',
        stageIds: ['stage2'],
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        vi.mocked(useGetMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
        })

        vi.mocked(useReadStagesQuery as Mock).mockReturnValue({
            data: mockStages,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page with title', () => {
        const mockTitle = 'Выбрать этапы'

        render(<StageSelectionPage />)

        const title1 = screen.getByRole('heading', {
            level: 1,
            name: mockTitle,
        })

        const title2 = screen.getByRole('heading', {
            level: 2,
            name: mockTitle,
        })

        expect(title1).toBeInTheDocument()
        expect(title2).toBeInTheDocument()
    })

    it('renders stage items', () => {
        render(<StageSelectionPage />)

        const stage1 = screen.getByAltText(mockStages[0].title)
        const stage2 = screen.getByAltText(mockStages[1].title)

        expect(stage1).toBeInTheDocument()
        expect(stage2).toBeInTheDocument()
    })

    it('toggles stage selection on click', async () => {
        const user = userEvent.setup()

        render(<StageSelectionPage />)

        const imgContainers = screen
            .getAllByTestId('mocked-image')
            .map((img) => img.parentElement)

        await user.click(imgContainers[0]!)

        const selected = document.querySelectorAll('.img-order-selected')
        expect(selected.length).toBe(2)

        await user.click(imgContainers[1]!)

        const finalSelected = document.querySelectorAll('.img-order-selected')
        expect(finalSelected.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageSelectionPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageSelectionPage />)

        const button = screen.getByTestId('mocked-nav-button-Сохранить')
        await user.click(button)

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

        render(<StageSelectionPage />)

        const selected = document.querySelectorAll('.img-order-selected')
        expect(selected.length).toBe(0)
    })
})
