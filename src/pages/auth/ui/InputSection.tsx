import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { Label } from './Label'

export interface InputSectionProps
    extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegisterReturn
    label: string
    error?: string
}

export const InputSection = ({
    id,
    register,
    label,
    error,
    autoCapitalize,
    autoComplete = 'off',
    type,
}: InputSectionProps) => (
    <section className="relative">
        <input
            {...register}
            id={id}
            className={classNames(
                'peer w-full rounded-xl bg-white px-4 pt-3 pb-2 text-base placeholder-transparent focus:outline-none dark:bg-black dark:text-white',
                'border focus:border-black dark:focus:border-white',
                error
                    ? 'border-rose-500 dark:border-rose-400'
                    : 'border-neutral-300 dark:border-neutral-700'
            )}
            placeholder={label}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            type={type}
        />

        <Label id="username" text={label} error={error} />
    </section>
)
