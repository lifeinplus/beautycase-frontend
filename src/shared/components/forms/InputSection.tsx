import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { Label } from './Label'

export interface InputSectionProps {
    label: string
    register: UseFormRegisterReturn
    type: string
    description?: string
    error?: string
    required?: boolean
}

export const InputSection = ({
    label,
    register,
    type,
    description,
    error,
    required = false,
}: InputSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <input
                {...register}
                className={classNames('form-input', error && 'border-error')}
                placeholder={label}
                type={type}
            />
        </Label>

        {description && <p className="form-description">{description}</p>}

        {error && <p className="form-error text-danger">{error}</p>}
    </div>
)
