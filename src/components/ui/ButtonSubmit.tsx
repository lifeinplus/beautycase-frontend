import { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

import { SpinnerButton } from '../SpinnerButton'

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
            'btn focus-outline',
            className,
            isLoading && 'btn-loading cursor-not-allowed'
        )}
        disabled={isLoading}
        type="submit"
    >
        {isLoading && <SpinnerButton />}
        {label}
    </button>
)
