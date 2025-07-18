import { render, screen } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import {
    mockActionAdd,
    mockActionDelete,
} from '@/shared/hooks/__mocks__/useNavBarActions'
import { useNavBarActions } from '@/shared/hooks/useNavBarActions'
import { Layout } from '../Layout'

vi.mock('@/shared/hooks/useNavBarActions')
vi.mock('../../modals/ModalDelete')
vi.mock('../../navigation/NavBar')
vi.mock('../../navigation/NavButton')

describe('Layout', () => {
    it('renders NavBar with NavButtons', () => {
        vi.mocked(useNavBarActions).mockReturnValue([mockActionAdd])

        render(<Layout />)

        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    })

    it('renders ModalDelete if delete action has modalProps', () => {
        vi.mocked(useNavBarActions as Mock).mockReturnValue([mockActionDelete])

        render(<Layout />)

        expect(screen.getByTestId('mocked-modal-delete')).toBeInTheDocument()
    })
})
