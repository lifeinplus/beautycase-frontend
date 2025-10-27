import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { setFormData } from '@/features/form/slice/formSlice'
import { mockStoreLinks } from '@/features/stores/api/__mocks__/storesApi'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { AddButton } from './AddButton'

vi.mock('@/app/hooks/hooks')

describe('AddButton', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })
    })

    it('renders AddButton correctly', () => {
        render(<AddButton storeLinks={mockStoreLinks} />)

        expect(
            screen.getByRole('button', { name: 'buttons.storeLinks.text' })
        ).toBeInTheDocument()
    })

    it('renders null if there has no access', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AddButton storeLinks={mockStoreLinks} />)

        expect(
            screen.queryByRole('button', { name: 'buttons.storeLinks.text' })
        ).not.toBeInTheDocument()
    })

    it('navigates to links page when add button is clicked', async () => {
        const user = userEvent.setup()

        render(<AddButton storeLinks={mockStoreLinks} />)

        await user.click(
            screen.getByRole('button', { name: 'buttons.storeLinks.text' })
        )

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({ storeLinks: mockStoreLinks })
        )

        expect(mockNavigate).toHaveBeenCalledWith('links')
    })
})
