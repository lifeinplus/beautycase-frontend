import { ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
        success: 'text-success',
        danger: 'text-danger',
        warning: 'text-warning',
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
