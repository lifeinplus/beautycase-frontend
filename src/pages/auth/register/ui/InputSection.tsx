import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Label } from './Label'

export interface InputSectionProps {
    id: string
    register: UseFormRegisterReturn
    label: string
    error?: string
    autoComplete: string
    type: string
}

export const InputSection = ({
    id,
    register,
    label,
    error,
    autoComplete,
    type,
}: InputSectionProps) => (
    <section className="relative mb-5">
        <input
            {...register}
            id={id}
            className={classNames(
                'peer w-full rounded-xl bg-white px-4 pt-3 pb-2 text-base placeholder-transparent focus:outline-none dark:bg-black dark:text-white',
                'border border-neutral-300 focus:border-black dark:border-neutral-700 dark:focus:border-white',
                error && 'border-rose-500 dark:border-rose-400'
            )}
            placeholder={label}
            autoComplete={autoComplete}
            type={type}
        />

        <Label id="username" text={label} error={error} />
    </section>
)
