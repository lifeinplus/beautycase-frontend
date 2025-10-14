import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { setFormData } from '@/features/form/slice/formSlice'
import { mockTools } from '@/features/tools/api/__mocks__/toolsApi'
import { useGetAllToolsQuery } from '@/features/tools/api/toolsApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { ToolSelection } from './ToolSelection'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/tools/api/toolsApi')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

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

        expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetAllToolsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<ToolSelection />)

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
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

        render(<ToolSelection />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

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

        const selected = document.querySelectorAll(
            "[class*='bg-rose-500 text-white']"
        )
        expect(selected.length).toBe(0)
    })
})
