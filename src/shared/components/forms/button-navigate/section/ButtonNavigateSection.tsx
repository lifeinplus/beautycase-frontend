import { ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import commonStyles from '@/shared/components/common/common.module.css'
import formStyles from '@/shared/components/forms/form.module.css'
import { Label } from '../../label/Label'
import styles from './ButtonNavigateSection.module.css'

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
                    className={classNames(
                        styles.buttonNavigate,
                        error && formStyles.borderError
                    )}
                    onClick={onNavigate}
                    type="button"
                >
                    <span>{text}</span>
                    <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </Label>

            {description && (
                <p className={formStyles.description}>{description}</p>
            )}

            {error && (
                <p
                    className={classNames(
                        commonStyles.textDanger,
                        formStyles.error
                    )}
                >
                    {error}
                </p>
            )}
        </div>
    )
}
