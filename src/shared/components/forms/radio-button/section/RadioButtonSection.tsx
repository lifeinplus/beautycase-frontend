import { UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { QuestionnaireOption } from '@/features/questionnaires/types'
import formStyles from '@/shared/components/forms/form.module.css'
import { Label } from '../../label/Label'
import { RadioButtonItem } from '../item/RadioButtonItem'

export interface RadioButtonSectionProps {
    description?: string
    horizontal?: boolean
    label: string
    options: QuestionnaireOption[]
    register: UseFormRegisterReturn
}

export const RadioButtonSection = ({
    description,
    horizontal = false,
    label,
    options,
    register,
}: RadioButtonSectionProps) => {
    const { t } = useTranslation('questionnaire')

    return (
        <div>
            <Label text={label} />

            <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                <nav
                    className={`flex min-w-[240px] gap-1 p-2 ${horizontal ? 'flex-row' : 'flex-col'}`}
                >
                    {options.map((o) => (
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
                <p className={formStyles.description}>{description}</p>
            )}
        </div>
    )
}
