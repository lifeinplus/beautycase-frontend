import { ChevronDownIcon } from '@heroicons/react/24/outline'
import type { UseFormRegisterReturn } from 'react-hook-form'

import type { SelectOption } from '../types'
import { Label } from './Label'

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
}: SelectSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <div className="grid">
                <ChevronDownIcon className="form-select-icon" />
                <select
                    {...register}
                    className={`form-select ${error ? 'border-error' : ''}`}
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

        {error && <p className="form-error">{error}</p>}
    </div>
)
