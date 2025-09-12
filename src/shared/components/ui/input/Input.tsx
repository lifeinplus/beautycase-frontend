import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

import inputStyles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => (
    <input className={classNames(inputStyles.input, className)} {...props} />
)
