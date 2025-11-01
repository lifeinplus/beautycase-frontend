import classNames from 'classnames'
import { ReactNode } from 'react'

export interface LabelProps {
    children?: ReactNode
    required?: boolean
    text: string
    center?: boolean
}

export const Label = ({
    children,
    required,
    text,
    center = false,
}: LabelProps) => (
    <label className={classNames('block', center && 'text-center')}>
        <span className="my-4 block font-bold">
            {text}
            {required && (
                <span className={'text-rose-500 dark:text-rose-400'}> *</span>
            )}
        </span>

        {children}
    </label>
)
