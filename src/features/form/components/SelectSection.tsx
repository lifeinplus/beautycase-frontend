import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

import { Label } from './Label'
import type { SelectOption } from '../types'

interface SelectSectionProps {
    label: string
    register: UseFormRegisterReturn
    description?: string
    error?: FieldError
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
}: SelectSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <div className="grid">
                <ChevronDownIcon className="form-select-icon" />
                <select
                    {...register}
                    className={`form-select ${error ? 'border-rose-500 dark:border-rose-400' : ''}`}
                    value={value}
                >
                    <option value="" disabled>
                        Выбрать
                    </option>
                    {options?.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.text}
                        </option>
                    ))}
                </select>
            </div>
        </Label>

        {description && <p className="form-description">{description}</p>}

        {error && <p className="form-error">{error.message}</p>}
    </div>
)
