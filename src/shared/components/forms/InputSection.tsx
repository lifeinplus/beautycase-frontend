import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import commonStyles from '@/shared/components/common/common.module.css'
import formStyles from '@/shared/components/forms/form.module.css'
import inputStyles from '@/shared/components/ui/Input.module.css'
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
                className={classNames(
                    inputStyles.input,
                    error && formStyles.borderError
                )}
                placeholder={label}
                type={type}
            />
        </Label>

        {description && <p className={formStyles.description}>{description}</p>}

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
