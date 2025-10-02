import { UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { QuestionnaireOption } from '@/features/questionnaires/training/options/trainingQuestionnaireOptions'
import { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { CheckboxItem } from '@/shared/components/forms/checkbox/item/CheckboxItem'
import formStyles from '@/shared/components/forms/form.module.css'
import { Label } from '../../label/Label'

export interface CheckboxSectionProps {
    description?: string
    label: string
    options: QuestionnaireOption[]
    register: UseFormRegister<MakeupBagQuestionnaire>
}

export const CheckboxSection = ({
    description,
    label,
    options,
    register,
}: CheckboxSectionProps) => {
    const { t } = useTranslation('questionnaire')

    return (
        <div>
            <Label text={label} />

            <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                    {options.map((o) => (
                        <CheckboxItem
                            key={o.id}
                            id={o.id}
                            label={t(o.label)}
                            register={register(o.name)}
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
