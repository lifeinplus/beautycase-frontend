import classNames from 'classnames'
import { MouseEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface ModalDeleteProps {
    title?: string
    description?: string
    isOpen?: boolean
    isBlocked?: boolean
    isLoading?: boolean
    onConfirm?: () => void | Promise<void>
    onCancel?: () => void | Promise<void>
}

export const ModalDelete = ({
    title = '',
    description = '',
    isOpen = false,
    isBlocked = false,
    isLoading = false,
    onConfirm = () => {},
    onCancel = () => {},
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
            className="md:ps-navbar lg:ps-navbar-wide fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleClickOutside}
        >
            <div
                className="m-5 flex w-3/4 max-w-96 flex-col space-y-10 rounded-xl bg-white shadow-lg md:w-1/2 dark:bg-neutral-800"
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
                            'min-h-12 w-full bg-transparent px-2 text-lg font-bold',
                            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
                            isBlocked
                                ? 'text-neutral-500 dark:text-neutral-400'
                                : 'text-rose-500 dark:text-rose-400'
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
                            'min-h-12 w-full rounded-b-xl bg-transparent px-2 pb-2 text-lg font-light text-black dark:text-white',
                            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700'
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
