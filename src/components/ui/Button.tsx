import { ButtonHTMLAttributes, ReactNode } from 'react'

import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'success' | 'danger' | 'warning'
}

export const Button = ({
    children,
    variant = 'success',
    className,
    ...props
}: ButtonProps) => {
    const variants = {
        success: 'btn-success',
        danger: 'btn-danger',
        warning: 'btn-warning',
    }

    return (
        <button
            className={classNames('btn-base', variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    )
}
