import { InputHTMLAttributes } from 'react'

import classNames from 'classnames'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
    return <input className={classNames('form-input', className)} {...props} />
}
