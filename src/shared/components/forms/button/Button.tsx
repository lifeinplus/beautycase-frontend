import classNames from 'classnames'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './Button.module.css'

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
        success: commonStyles.textSuccess,
        danger: commonStyles.textDanger,
        warning: commonStyles.textWarning,
    }

    return (
        <button
            {...props}
            className={classNames(styles.button, variants[variant], className)}
            type={type}
        >
            {children}
        </button>
    )
}
