import { type UseFormRegisterReturn } from 'react-hook-form'

import { Label } from './Label'

interface TextareaSectionProps {
    description?: string
    label: string
    register: UseFormRegisterReturn
}

export const TextareaSection = ({
    description,
    label,
    register,
}: TextareaSectionProps) => (
    <div>
        <Label text={label}>
            <textarea
                className={`form-input`}
                placeholder={label}
                {...register}
            />
        </Label>

        {description && (
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                {description}
            </p>
        )}
    </div>
)
