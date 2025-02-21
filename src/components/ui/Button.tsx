import { ButtonHTMLAttributes, ReactNode } from 'react'

import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    type?: 'button' | 'submit' | 'reset'
    variant?: 'success' | 'danger' | 'warning'
}

export const Button = ({
    children,
    className,
    type = 'button',
    variant = 'success',
    ...props
}: ButtonProps) => {
    const variants = {
        success: 'btn-success',
        danger: 'btn-danger',
        warning: 'btn-warning',
    }

    return (
        <button
            {...props}
            className={classNames('btn-base', variants[variant], className)}
            type={type}
        >
            {children}
        </button>
    )
}
