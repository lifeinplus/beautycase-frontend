import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

import { Label } from './Label'

interface InputSectionProps {
    label: string
    register: UseFormRegisterReturn
    type: string
    description?: string
    error?: FieldError
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
                className={`form-input ${error ? 'border-error' : ''}`}
                placeholder={label}
                type={type}
            />
        </Label>

        {description && <p className="form-description">{description}</p>}

        {error && <p className="form-error">{error.message}</p>}
    </div>
)
