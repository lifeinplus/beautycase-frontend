import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { ModalDuplicate } from '../ModalDuplicate'

describe('ModalDuplicate', () => {
    const mockProps = {
        description: 'Are you sure?',
        isOpen: true,
        onCancel: vi.fn(),
        onConfirm: vi.fn(),
        title: 'Duplicate Item',
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
        expect(screen.getByText('Duplicate Item')).toBeInTheDocument()
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
        expect(screen.getByText('Дублировать')).toBeInTheDocument()
        expect(screen.getByText('Отмена')).toBeInTheDocument()
    })

    it('calls onConfirm when duplicate button is clicked', () => {
        render(<ModalDuplicate {...mockProps} />)
        fireEvent.click(screen.getByText('Дублировать'))
        expect(mockProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', () => {
        render(<ModalDuplicate {...mockProps} />)
        fireEvent.click(screen.getByText('Отмена'))
        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when clicking outside the modal', () => {
        render(<ModalDuplicate {...mockProps} />)
        fireEvent.click(document.querySelector('.modal')!)
        expect(mockProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('does not call onCancel when clicking inside the modal content', () => {
        render(<ModalDuplicate {...mockProps} />)
        fireEvent.click(document.querySelector('.modal-container')!)
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
