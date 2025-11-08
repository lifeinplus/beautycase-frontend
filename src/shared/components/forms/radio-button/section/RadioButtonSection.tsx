import { FieldValues, UseFormRegisterReturn } from 'react-hook-form'

import type { QuestionnaireOption } from '@/features/questionnaires/types'
import classNames from 'classnames'
import { Label } from '../../label/Label'
import { RadioButtonItem } from '../item/RadioButtonItem'

export interface RadioButtonSectionProps<T extends FieldValues> {
    register: UseFormRegisterReturn
    label: string
    options?: QuestionnaireOption<T>[]
    description?: string
    error?: string
    center?: boolean
    horizontal?: boolean
    t: (key: string) => string
}

export const RadioButtonSection = <T extends FieldValues>({
    register,
    label,
    options,
    description,
    error,
    center = false,
    horizontal = false,
    t,
}: RadioButtonSectionProps<T>) => (
    <section>
        <Label text={t(label)} center={center} />

        <div
            className={classNames(
                'relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white',
                error && 'border-rose-500 dark:border-rose-400'
            )}
        >
            <nav
                className={`flex min-w-[240px] gap-1 p-2 ${horizontal ? 'flex-row' : 'flex-col'}`}
            >
                {options?.map((o) => (
                    <RadioButtonItem
                        key={o.id}
                        id={o.id}
                        label={t(o.label)}
                        register={register}
                        value={o.value}
                    />
                ))}
            </nav>
        </div>

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
                {t(error)}
            </p>
        )}
    </section>
)
