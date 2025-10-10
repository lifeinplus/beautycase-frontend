import classNames from 'classnames'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

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
        success: 'text-lime-500 dark:text-lime-400',
        danger: 'text-rose-500 dark:text-rose-400',
        warning: 'text-amber-500 dark:text-amber-400',
    }

    return (
        <button
            {...props}
            className={classNames(
                'inline-flex items-center justify-center bg-white px-4 py-2.5',
                'rounded-xl border border-neutral-200',
                'focus:border-black focus:outline-none',
                'dark:border-neutral-700 dark:bg-black dark:focus:border-white',
                variants[variant],
                className
            )}
            type={type}
        >
            {children}
        </button>
    )
}
