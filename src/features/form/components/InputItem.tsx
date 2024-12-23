import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

interface InputItemProps {
    label: string
    register: UseFormRegisterReturn
    required?: boolean
    type: string
    error?: FieldError
}

export const InputItem = ({
    label,
    register,
    required,
    type,
    error,
}: InputItemProps) => (
    <div>
        <label className="block">
            <span className="form-label">
                {label}
                {required ? (
                    <span className="text-rose-500 dark:text-rose-400"> *</span>
                ) : (
                    ''
                )}
            </span>
            <input
                className={`form-input ${error ? 'text-rose-500 dark:text-rose-400' : ''}`}
                type={type}
                {...register}
            />
        </label>
        {error && (
            <p className="text-sm text-rose-500 dark:text-rose-400">
                {error.message}
            </p>
        )}
    </div>
)
