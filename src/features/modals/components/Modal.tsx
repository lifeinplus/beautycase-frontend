import { MouseEvent, useRef } from 'react'

interface ModalProps {
    isOpen: boolean
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
}

export const Modal = ({
    isOpen,
    title,
    description,
    onConfirm,
    onCancel,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onCancel()
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal__container" ref={modalRef}>
                <div className="modal__content">
                    <h2 className="modal__content__title">{title}</h2>
                    <p className="modal__content__text">{description}</p>
                </div>
                <div className="modal__button-group">
                    <button
                        onClick={onConfirm}
                        className="modal__button--danger"
                    >
                        Удалить
                    </button>
                    <button
                        onClick={onCancel}
                        className="modal__button--secondary"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}
