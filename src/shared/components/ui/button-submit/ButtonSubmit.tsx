import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

import { Spinner } from './ui/Spinner'

export interface ButtonSubmitProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    label?: string
}

export const ButtonSubmit = ({
    className,
    isLoading = false,
    label = '',
    ...props
}: ButtonSubmitProps) => (
    <button
        {...props}
        className={classNames(
            'md:max-w-submit flex w-full justify-center gap-4 rounded-lg px-4 py-2 text-base font-semibold text-white',
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
            className,
            isLoading
                ? 'cursor-not-allowed bg-rose-200 hover:bg-rose-200 dark:bg-rose-950 dark:hover:bg-rose-950'
                : 'cursor-pointer bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700'
        )}
        disabled={isLoading}
        type="submit"
    >
        {isLoading && <Spinner />}
        {label}
    </button>
)
