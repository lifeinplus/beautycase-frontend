import { MouseEvent, useEffect, useRef } from 'react'

interface ModalDuplicateProps {
    description: string
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    title: string
}

export const ModalDuplicate = ({
    description,
    isOpen,
    onCancel,
    onConfirm,
    title,
}: ModalDuplicateProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isOpen])

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onCancel()
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal-container" ref={modalRef}>
                <div className="modal-content">
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-description">{description}</p>
                </div>
                <div className="modal-btn-group">
                    <button
                        onClick={onConfirm}
                        className="modal-btn modal-btn-warning"
                    >
                        Дублировать
                    </button>
                    <button
                        onClick={onCancel}
                        className="modal-btn modal-btn-bottom"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}
