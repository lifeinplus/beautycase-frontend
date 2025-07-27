import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Layout } from '../Layout'

vi.mock('@/shared/hooks/useNavBarActions')
vi.mock('../../modals/ModalDelete')
vi.mock('../../modals/ModalDuplicate')
vi.mock('../../navigation/NavBar')
vi.mock('../../navigation/NavButton')

describe('Layout', () => {
    it('renders NavBar with NavButtons', () => {
        render(<Layout />)
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    })

    it('renders ModalDelete if delete action has modalProps', () => {
        render(<Layout />)
        expect(screen.getByTestId('mocked-modal-delete')).toBeInTheDocument()
    })

    it('renders ModalDuplicate if duplicate action has modalProps', () => {
        render(<Layout />)
        expect(screen.getByTestId('mocked-modal-duplicate')).toBeInTheDocument()
    })
})
