import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { SelectOption } from '@/features/form/types'
import { Label } from '../../label/Label'

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
                    <ChevronDownIcon
                        className={classNames(
                            'pointer-events-none relative right-4 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden',
                            'text-neutral-600',
                            'dark:text-neutral-400'
                        )}
                    />
                    <select
                        {...register}
                        className={classNames(
                            'col-start-1 row-start-1 block w-full appearance-none rounded-xl py-2.5 ps-4 pe-10 focus:outline-none',
                            'bg-white placeholder-neutral-400',
                            'border border-neutral-200 focus:border-black',
                            'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                            error && 'border-rose-500 dark:border-rose-400'
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
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {description}
                </p>
            )}

            {error && (
                <p
                    className={classNames(
                        'text-rose-500 dark:text-rose-400',
                        'mt-2 text-sm'
                    )}
                >
                    {error}
                </p>
            )}
        </div>
    )
}
