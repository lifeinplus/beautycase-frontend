import { ReactNode } from 'react'

import commonStyles from '@/shared/components/common/common.module.css'

export interface LabelProps {
    children?: ReactNode
    required?: boolean
    text: string
}

export const Label = ({ children, required, text }: LabelProps) => (
    <label className="block">
        <span className="block py-4 font-bold">
            {text}
            {required && <span className={commonStyles.textDanger}> *</span>}
        </span>

        {children}
    </label>
)
