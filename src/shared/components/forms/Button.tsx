import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'

import commonStyles from '@/shared/components/common/common.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel?: string
    children: ReactNode
    type?: 'button' | 'submit' | 'reset'
    variant?: 'success' | 'danger' | 'warning'
}

export const Button = ({
    ariaLabel,
    children,
    className,
    type = 'button',
    variant = 'success',
    ...props
}: ButtonProps) => {
    const variants = {
        success: commonStyles.textSuccess,
        danger: commonStyles.textDanger,
        warning: commonStyles.textWarning,
    }

    return (
        <button
            {...props}
            aria-label={ariaLabel}
            className={classNames('form-button', variants[variant], className)}
            type={type}
        >
            {children}
        </button>
    )
}
