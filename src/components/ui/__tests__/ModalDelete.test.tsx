import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { ModalDelete, type ModalDeleteProps } from '../ModalDelete'

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
        expect(screen.getByText('Удалить')).toBeInTheDocument()
        expect(screen.getByText('Отмена')).toBeInTheDocument()
    })

    it('calls onConfirm when delete button is clicked', () => {
        render(<ModalDelete {...mockProps} />)
        fireEvent.click(screen.getByText('Удалить'))
        expect(mockProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', () => {
        render(<ModalDelete {...mockProps} />)
        fireEvent.click(screen.getByText('Отмена'))
        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when clicking outside the modal', () => {
        render(<ModalDelete {...mockProps} />)
        fireEvent.click(document.querySelector('.modal')!)
        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('does not call onCancel when clicking inside the modal content', () => {
        render(<ModalDelete {...mockProps} />)
        fireEvent.click(document.querySelector('.modal-container')!)
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
