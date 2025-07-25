import classNames from 'classnames'
import { MouseEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './modal.module.css'

export interface ModalDeleteProps {
    description: string
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    title: string
}

export const ModalDelete = ({
    description,
    isOpen,
    onCancel,
    onConfirm,
    title,
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
        <div className={styles.modal} onClick={handleClickOutside}>
            <div className={styles.container} ref={modalRef}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.btnGroup}>
                    <button
                        aria-label={t('buttons.delete.ariaLabel')}
                        onClick={onConfirm}
                        className={classNames(
                            commonStyles.textDanger,
                            styles.btn
                        )}
                    >
                        {t('buttons.delete.text')}
                    </button>
                    <button
                        aria-label={t('buttons.cancel.ariaLabel')}
                        onClick={onCancel}
                        className={classNames(styles.btn, styles.btnBottom)}
                    >
                        {t('buttons.cancel.text')}
                    </button>
                </div>
            </div>
        </div>
    )
}
