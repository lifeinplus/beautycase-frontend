import { ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import { Label } from '../../label/Label'

export interface ButtonNavigateSectionProps {
    label: string
    onNavigate: () => void
    text: string
    description?: string
    error?: string
    required?: boolean
}

export const ButtonNavigateSection = ({
    label,
    onNavigate,
    text,
    description,
    error,
    required,
}: ButtonNavigateSectionProps) => {
    return (
        <div>
            <Label required={required} text={label}>
                <button
                    className={classNames(
                        'flex w-full items-center justify-between bg-white px-4 py-2.5',
                        'rounded-xl border border-neutral-200 focus:border-black focus:outline-none',
                        'dark:border-neutral-700 dark:bg-black dark:focus:border-white',
                        error && 'border-rose-500 dark:border-rose-400'
                    )}
                    onClick={onNavigate}
                    type="button"
                >
                    <span>{text}</span>
                    <ChevronRightIcon className="size-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </Label>

            {description && (
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {description}
                </p>
            )}

            {error && (
                <p
                    className={classNames(
                        'text-rose-500 dark:text-rose-400',
                        'mt-2 text-sm'
                    )}
                >
                    {error}
                </p>
            )}
        </div>
    )
}
