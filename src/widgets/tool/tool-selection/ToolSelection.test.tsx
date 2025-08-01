import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { setFormData } from '@/features/form/formSlice'
import { mockTools } from '@/features/tools/__mocks__/toolsApi'
import { useGetAllToolsQuery } from '@/features/tools/toolsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { ToolSelection } from './ToolSelection'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/tools/toolsApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/ui/Image')

describe('ToolSelection', () => {
    const mockFormData = {
        toolIds: ['tool2'],
    }

    beforeEach(() => {
        vi.mocked(useGetAllToolsQuery as Mock).mockReturnValue({
            data: mockTools,
            isLoading: false,
            error: null,
        })

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)
    })

    it('renders loading state when data is loading', () => {
        vi.mocked(useGetAllToolsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        })

        render(<ToolSelection />)

        expect(screen.getByTestId('mocked-loading')).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetAllToolsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<ToolSelection />)

        expect(screen.getByTestId('mocked-error')).toBeInTheDocument()
    })

    it('renders tool items', () => {
        render(<ToolSelection />)

        const tool1 = screen.getByAltText('Tool 1')
        const tool2 = screen.getByAltText('Tool 2')

        expect(tool1).toBeInTheDocument()
        expect(tool2).toBeInTheDocument()
    })

    it('toggles tool selection on click', async () => {
        const user = userEvent.setup()

        render(<ToolSelection />)

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

        render(<ToolSelection />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<ToolSelection />)

        await user.click(screen.getByText('navigation:actions.save'))

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

        render(<ToolSelection />)

        const selected = document.querySelectorAll("[class*='numbered']")
        expect(selected.length).toBe(0)
    })
})
