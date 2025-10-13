import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => (
    <input
        className={classNames(
            'block w-full rounded-xl px-4 py-2.5 focus:outline-none',
            'bg-white placeholder-neutral-500',
            'border border-neutral-200 focus:border-black',
            'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
            className
        )}
        {...props}
    />
)
