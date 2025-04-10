import { type UseFormRegister } from 'react-hook-form'
import { QuestionnaireOption } from '../../questionnaires/options'
import { Questionnaire } from '../../questionnaires/types'
import { Label } from './Label'
import { RadioButtonItem } from './RadioButtonItem'

export interface RadioButtonSectionProps {
    description?: string
    horizontal?: boolean
    label: string
    options: QuestionnaireOption[]
    register: UseFormRegister<Questionnaire>
}

export const RadioButtonSection = ({
    description,
    horizontal = false,
    label,
    options,
    register,
}: RadioButtonSectionProps) => (
    <div>
        <Label text={label} />

        <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
            <nav
                className={`flex min-w-[240px] gap-1 p-2 ${horizontal ? 'flex-row' : 'flex-col'}`}
            >
                {options.map((o) => (
                    <RadioButtonItem
                        key={o.id}
                        id={o.id}
                        label={o.label}
                        register={register(o.name)}
                        value={o.value}
                    />
                ))}
            </nav>
        </div>

        {description && <p className="form-description">{description}</p>}
    </div>
)
