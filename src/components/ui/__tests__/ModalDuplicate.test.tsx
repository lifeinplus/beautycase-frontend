import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'

import { ModalDuplicate, type ModalDuplicateProps } from '../ModalDuplicate'

describe('ModalDuplicate', () => {
    const mockProps: ModalDuplicateProps = {
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
            <ModalDuplicate {...mockProps} isOpen={false} />
        )

        expect(container.firstChild).toBeNull()
    })

    it('renders when isOpen is true', () => {
        render(<ModalDuplicate {...mockProps} />)

        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.getByText(mockProps.description)).toBeInTheDocument()
        expect(screen.getByText('Дублировать')).toBeInTheDocument()
        expect(screen.getByText('Отмена')).toBeInTheDocument()
    })

    it('calls onConfirm when duplicate button is clicked', async () => {
        const user = userEvent.setup()

        render(<ModalDuplicate {...mockProps} />)

        const button = screen.getByRole('button', { name: /duplicate/i })
        await user.click(button)

        expect(mockProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', async () => {
        const user = userEvent.setup()

        render(<ModalDuplicate {...mockProps} />)

        const button = screen.getByRole('button', { name: /cancel/i })
        await user.click(button)

        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when clicking outside the modal', async () => {
        const user = userEvent.setup()

        render(<ModalDuplicate {...mockProps} />)

        const modal = document.querySelector('.modal')!
        await user.click(modal)

        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('does not call onCancel when clicking inside the modal content', async () => {
        const user = userEvent.setup()

        render(<ModalDuplicate {...mockProps} />)

        const container = document.querySelector('.modal-container')!
        await user.click(container)

        expect(mockProps.onCancel).not.toHaveBeenCalled()
    })

    it('adds overflow-hidden class to body when modal opens', () => {
        render(<ModalDuplicate {...mockProps} />)
        expect(document.body.classList.contains('overflow-hidden')).toBe(true)
    })

    it('removes overflow-hidden class from body when modal closes', () => {
        const { rerender } = render(<ModalDuplicate {...mockProps} />)
        expect(document.body.classList.contains('overflow-hidden')).toBe(true)

        rerender(<ModalDuplicate {...mockProps} isOpen={false} />)
        expect(document.body.classList.contains('overflow-hidden')).toBe(false)
    })
})
