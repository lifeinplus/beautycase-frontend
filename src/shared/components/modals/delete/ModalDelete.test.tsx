import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ModalDelete, type ModalDeleteProps } from './ModalDelete'

describe('ModalDelete', () => {
    const mockProps: ModalDeleteProps = {
        description: 'Test Description',
        isOpen: true,
        onCancel: vi.fn(),
        onConfirm: vi.fn(),
        title: 'Test Title',
    }

    afterEach(() => {
        cleanup()
        document.body.classList.remove('overflow-hidden')
    })

    it('does not render when isOpen is false', () => {
        const { container } = render(
            <ModalDelete {...mockProps} isOpen={false} />
        )

        expect(container.firstChild).toBeNull()
    })

    it('renders when isOpen is true', () => {
        render(<ModalDelete {...mockProps} />)

        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.getByText(mockProps.description)).toBeInTheDocument()
        expect(screen.getByText('buttons.delete.text')).toBeInTheDocument()
        expect(screen.getByText('buttons.cancel.text')).toBeInTheDocument()
    })

    it('calls onConfirm when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(<ModalDelete {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /delete/i }))

        expect(mockProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', async () => {
        const user = userEvent.setup()

        render(<ModalDelete {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /cancel/i }))

        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when clicking outside the modal', async () => {
        const user = userEvent.setup()

        render(<ModalDelete {...mockProps} />)

        const modal = document.querySelector("[class*='modal']")
        expect(modal).toBeInTheDocument()

        await user.click(modal!)

        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('does not call onCancel when clicking inside the modal content', async () => {
        const user = userEvent.setup()

        render(<ModalDelete {...mockProps} />)
        await user.click(document.querySelector('.modal-container')!)

        expect(mockProps.onCancel).not.toHaveBeenCalled()
    })

    it('adds overflow-hidden class to body when modal opens', () => {
        render(<ModalDelete {...mockProps} />)
        expect(document.body.classList.contains('overflow-hidden')).toBe(true)
    })

    it('removes overflow-hidden class from body when modal closes', () => {
        const { rerender } = render(<ModalDelete {...mockProps} />)
        expect(document.body.classList.contains('overflow-hidden')).toBe(true)

        rerender(<ModalDelete {...mockProps} isOpen={false} />)
        expect(document.body.classList.contains('overflow-hidden')).toBe(false)
    })
})
