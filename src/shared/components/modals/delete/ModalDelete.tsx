import classNames from 'classnames'
import { MouseEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import commonStyles from '@/shared/components/common/common.module.css'
import modalStyles from '../modal.module.css'

export interface ModalDeleteProps {
    title?: string
    description?: string
    onConfirm?: () => void
    onCancel?: () => void
    isOpen?: boolean
    isBlocked?: boolean
    isDeleting?: boolean
}

export const ModalDelete = ({
    title = '',
    description = '',
    onConfirm = () => {},
    onCancel = () => {},
    isOpen = false,
    isBlocked = false,
    isDeleting = false,
}: ModalDeleteProps) => {
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
        <div className={modalStyles.modal} onClick={handleClickOutside}>
            <div className={modalStyles.container} ref={modalRef}>
                <div className={modalStyles.content}>
                    <h2 className={modalStyles.title}>{title}</h2>
                    <p className={modalStyles.description}>{description}</p>
                </div>

                <div className={modalStyles.btnGroup}>
                    <button
                        aria-label={t('buttons.delete.ariaLabel')}
                        className={classNames(
                            commonStyles.textDanger,
                            commonStyles.focusOutline,
                            modalStyles.btn,
                            isBlocked && commonStyles.textSecondary
                        )}
                        disabled={isBlocked || isDeleting}
                        onClick={onConfirm}
                    >
                        {isDeleting
                            ? t('buttons.delete.loading')
                            : t('buttons.delete.text')}
                    </button>

                    <button
                        aria-label={t('buttons.cancel.ariaLabel')}
                        className={classNames(
                            commonStyles.focusOutline,
                            modalStyles.btn,
                            modalStyles.btnBottom
                        )}
                        onClick={onCancel}
                    >
                        {t('buttons.cancel.text')}
                    </button>
                </div>
            </div>
        </div>
    )
}
