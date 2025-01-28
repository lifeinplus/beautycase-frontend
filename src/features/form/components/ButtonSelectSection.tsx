import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { type FieldError } from 'react-hook-form'

import { StoreLink } from '../../stores'
import { Label } from './Label'

interface ButtonSelectSectionProps {
    handleNavigate: () => void
    label: string
    description?: string
    error?: FieldError
    path?: string
    required?: boolean
    value?: StoreLink[]
}

const generateButtonText = (value?: StoreLink[]) => {
    return value?.length ? `Добавлено: ${value.length}` : 'Добавить'
}

export const ButtonSelectSection = ({
    handleNavigate,
    label,
    description,
    error,
    required,
    value,
}: ButtonSelectSectionProps) => {
    return (
        <div>
            <Label required={required} text={label}>
                <button
                    className={`form-button-select ${error ? 'border-rose-500 dark:border-rose-400' : ''}`}
                    onClick={handleNavigate}
                    type="button"
                >
                    <span>{generateButtonText(value)}</span>
                    <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </Label>

            {description && <p className="form-description">{description}</p>}

            {error && (
                <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                    {error.message}
                </p>
            )}
        </div>
    )
}
