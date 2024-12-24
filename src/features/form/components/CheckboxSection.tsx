import { UseFormRegister } from 'react-hook-form'

import {
    type Questionnaire,
    type QuestionnaireOption,
} from '../../questionnaire'
import { CheckboxItem } from './CheckboxItem'
import { Label } from './Label'

interface CheckboxSectionProps {
    label: string
    options: QuestionnaireOption[]
    register: UseFormRegister<Questionnaire>
}

export const CheckboxSection = ({
    label,
    options,
    register,
}: CheckboxSectionProps) => (
    <div>
        <Label text={label} />
        <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
            <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                {options.map((o) => (
                    <CheckboxItem
                        key={o.id}
                        id={o.id}
                        label={o.label}
                        register={register(o.name)}
                    />
                ))}
            </nav>
        </div>
    </div>
)
