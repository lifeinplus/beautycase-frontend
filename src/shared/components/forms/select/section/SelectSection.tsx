import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { SelectOption } from '@/features/form/types'
import commonStyles from '@/shared/components/common/common.module.css'
import formStyles from '@/shared/components/forms/form.module.css'
import { Label } from '../../label/Label'
import styles from './SelectSection.module.css'

export interface SelectSectionProps {
    label: string
    register: UseFormRegisterReturn
    description?: string
    error?: string
    options?: SelectOption[]
    required?: boolean
    value?: string
}

export const SelectSection = ({
    label,
    register,
    description,
    error,
    options,
    required,
    value = '',
}: SelectSectionProps) => {
    const { t } = useTranslation('form')

    return (
        <div>
            <Label required={required} text={label}>
                <div className="grid">
                    <ChevronDownIcon className={styles.icon} />
                    <select
                        {...register}
                        className={classNames(
                            styles.select,
                            error && styles.error
                        )}
                        value={value}
                    >
                        <option value="" disabled>
                            {t('select')}
                        </option>
                        {options?.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.text}
                            </option>
                        ))}
                    </select>
                </div>
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
