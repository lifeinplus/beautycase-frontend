import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

import { ImagePreview } from './ImagePreview'
import { Label } from './Label'

interface TextareaSectionProps {
    label: string
    register: UseFormRegisterReturn
    description?: string
    error?: FieldError
    preview?: boolean
    required?: boolean
    rows?: number
    value?: string
}

export const TextareaSection = ({
    label,
    register,
    description,
    error,
    preview = false,
    required = false,
    rows,
    value = '',
}: TextareaSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <textarea
                {...register}
                className={`form-input peer ${error ? 'border-rose-500 dark:border-rose-400' : ''}`}
                placeholder={label}
                rows={rows}
            />

            {preview && value && <ImagePreview url={value} />}
        </Label>

        {description && <p className="form-description">{description}</p>}

        {error && (
            <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                {error.message}
            </p>
        )}
    </div>
)
