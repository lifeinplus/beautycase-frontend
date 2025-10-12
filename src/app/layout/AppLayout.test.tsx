import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AppLayout } from './AppLayout'

vi.mock('@/app/layout/hooks/nav-bar-actions/useNavBarActions')
vi.mock('@/app/layout/nav-bar/NavBar')
vi.mock('@/shared/components/modals/delete/ModalDelete')
vi.mock('@/shared/components/modals/duplicate/ModalDuplicate')

describe('AppLayout', () => {
    it('renders NavBar with NavButtons', () => {
        render(<AppLayout />)
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    })

    it('renders ModalDelete if delete action has modalProps', () => {
        render(<AppLayout />)
        expect(screen.getByTestId('mocked-modal-delete')).toBeInTheDocument()
    })

    it('renders ModalDuplicate if duplicate action has modalProps', () => {
        render(<AppLayout />)
        expect(screen.getByTestId('mocked-modal-duplicate')).toBeInTheDocument()
    })
})
