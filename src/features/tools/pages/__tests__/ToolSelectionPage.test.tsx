import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'

import { useAppSelector } from '../../../../app/hooks'
import { mockTools } from '../../__mocks__/toolsApiSlice'
import { useGetToolsQuery } from '../../toolsApiSlice'
import { ToolSelectionPage } from '../ToolSelectionPage'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import userEvent from '@testing-library/user-event'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { setFormData } from '../../../form/formSlice'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/Image')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../form/formSlice')
vi.mock('../../toolsApiSlice')

describe('ToolSelectionPage', () => {
    const mockFormData = {
        toolIds: ['tool2'],
    }

    beforeEach(() => {
        vi.mocked(useGetToolsQuery as Mock).mockReturnValue({
            data: mockTools,
            isLoading: false,
            error: null,
        })

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)
    })

    it('renders loading state when data is loading', () => {
        vi.mocked(useGetToolsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        })

        render(<ToolSelectionPage />)

        const loading = screen.getByText('Loading...')
        expect(loading).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetToolsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<ToolSelectionPage />)

        const error = screen.getByText('Error loading tools')
        expect(error).toBeInTheDocument()
    })

    it('renders tool items', () => {
        render(<ToolSelectionPage />)

        const tool1 = screen.getByAltText('Tool 1')
        const tool2 = screen.getByAltText('Tool 2')

        expect(tool1).toBeInTheDocument()
        expect(tool2).toBeInTheDocument()
    })

    it('toggles tool selection on click', async () => {
        const user = userEvent.setup()

        render(<ToolSelectionPage />)

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

        render(<ToolSelectionPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<ToolSelectionPage />)

        const button = screen.getByTestId('mocked-nav-button-Сохранить')
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({
                ...mockFormData,
                toolIds: ['tool2'],
            })
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('uses an empty array when there is no toolId', async () => {
        vi.mocked(useAppSelector).mockReturnValue({ toolIds: null })

        render(<ToolSelectionPage />)

        const selected = document.querySelectorAll('.img-order-selected')
        expect(selected.length).toBe(0)
    })
})
