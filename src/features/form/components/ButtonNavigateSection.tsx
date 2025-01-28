import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { type FieldError } from 'react-hook-form'

import { Label } from './Label'

interface ButtonNavigateSectionProps {
    handleNavigate: () => void
    label: string
    text: string
    description?: string
    error?: FieldError
    required?: boolean
}

export const ButtonNavigateSection = ({
    handleNavigate,
    label,
    text,
    description,
    error,
    required,
}: ButtonNavigateSectionProps) => {
    return (
        <div>
            <Label required={required} text={label}>
                <button
                    className={`form-button-navigate ${error ? 'border-rose-500 dark:border-rose-400' : ''}`}
                    onClick={handleNavigate}
                    type="button"
                >
                    <span>{text}</span>
                    <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </Label>

            {description && <p className="form-description">{description}</p>}

            {error && <p className="form-error">{error.message}</p>}
        </div>
    )
}
