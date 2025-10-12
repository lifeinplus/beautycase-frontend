import classNames from 'classnames'
import { MouseEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface ModalDeleteProps {
    title?: string
    description?: string
    onConfirm?: () => void
    onCancel?: () => void
    isOpen?: boolean
    isBlocked?: boolean
    isLoading?: boolean
}

export const ModalDelete = ({
    title = '',
    description = '',
    onConfirm = () => {},
    onCancel = () => {},
    isOpen = false,
    isBlocked = false,
    isLoading = false,
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
        <div
            className="sm:ps-navbar lg:ps-navbar-open fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleClickOutside}
        >
            <div
                className="m-5 flex w-3/4 max-w-96 flex-col space-y-10 rounded-xl bg-white shadow-lg sm:w-1/2 dark:bg-neutral-800"
                ref={modalRef}
            >
                <div className="mt-8 space-y-3 px-5 text-center">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-base leading-snug text-neutral-500 dark:text-neutral-300">
                        {description}
                    </p>
                </div>

                <div className="w-full space-y-2">
                    <button
                        aria-label={t('buttons.delete.ariaLabel')}
                        className={classNames(
                            'text-rose-500 dark:text-rose-400',
                            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                            'dark:focus-visible:outline-rose-700',
                            'min-h-12 w-full bg-transparent px-2 text-lg font-bold',
                            isBlocked &&
                                'text-neutral-500 dark:text-neutral-400'
                        )}
                        disabled={isBlocked || isLoading}
                        onClick={onConfirm}
                    >
                        {isLoading
                            ? t('buttons.delete.loading')
                            : t('buttons.delete.text')}
                    </button>

                    <button
                        aria-label={t('buttons.cancel.ariaLabel')}
                        className={classNames(
                            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                            'dark:focus-visible:outline-rose-700',
                            'min-h-12 w-full bg-transparent px-2 text-lg font-bold',
                            'rounded-b-xl pb-2 font-light text-black dark:text-white'
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
