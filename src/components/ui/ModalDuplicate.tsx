import { MouseEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface ModalDuplicateProps {
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
    const { t } = useTranslation('modal')

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
                        aria-label={t('buttons.duplicate.ariaLabel')}
                        onClick={onConfirm}
                        className="modal-btn text-warning"
                    >
                        {t('buttons.duplicate.text')}
                    </button>
                    <button
                        aria-label={t('buttons.cancel.ariaLabel')}
                        onClick={onCancel}
                        className="modal-btn modal-btn-bottom"
                    >
                        {t('buttons.cancel.text')}
                    </button>
                </div>
            </div>
        </div>
    )
}
