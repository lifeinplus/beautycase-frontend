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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClickOutside}
        >
            <div
                className="w-58 flex flex-col rounded-xl bg-neutral-800 shadow-lg"
                ref={modalRef}
            >
                <div className="mx-8 mb-4 mt-8 text-center">
                    <h2 className="text-xl leading-none">{title}</h2>
                    <p className="leading-4.5 pt-2.5 text-sm text-neutral-400">
                        {description}
                    </p>
                </div>
                <div className="mt-3 w-full">
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
