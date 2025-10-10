import { ReactNode } from 'react'

export interface LabelProps {
    children?: ReactNode
    required?: boolean
    text: string
}

export const Label = ({ children, required, text }: LabelProps) => (
    <label className="block">
        <span className="block py-4 font-bold">
            {text}
            {required && (
                <span className={'text-rose-500 dark:text-rose-400'}> *</span>
            )}
        </span>

        {children}
    </label>
)
