import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { Label } from '../../label/Label'

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
                    'block w-full rounded-xl px-4 py-2.5 focus:outline-none',
                    'bg-white placeholder-neutral-400',
                    'border border-neutral-300 focus:border-black',
                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                    error && 'border-rose-500 dark:border-rose-400'
                )}
                placeholder={label}
                type={type}
            />
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
