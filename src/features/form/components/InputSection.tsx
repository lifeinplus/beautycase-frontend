import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import { Label } from './Label'

interface InputSectionProps {
    error?: FieldError
    label: string
    register: UseFormRegisterReturn
    required?: boolean
    type: string
}

export const InputSection = ({
    error,
    label,
    register,
    required,
    type,
}: InputSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <input
                className={`form-input ${error ? 'text-rose-500 dark:text-rose-400' : ''}`}
                placeholder={label}
                type={type}
                {...register}
            />
        </Label>

        {error && (
            <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                {error.message}
            </p>
        )}
    </div>
)
