import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { Label } from './Label'

export interface ButtonNavigateSectionProps {
    label: string
    onNavigate: () => void
    text: string
    description?: string
    error?: string
    required?: boolean
}

export const ButtonNavigateSection = ({
    label,
    onNavigate,
    text,
    description,
    error,
    required,
}: ButtonNavigateSectionProps) => {
    return (
        <div>
            <Label required={required} text={label}>
                <button
                    className={`form-button-navigate ${error ? 'border-error' : ''}`}
                    onClick={onNavigate}
                    type="button"
                >
                    <span>{text}</span>
                    <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </Label>

            {description && <p className="form-description">{description}</p>}

            {error && <p className="form-error text-danger">{error}</p>}
        </div>
    )
}
