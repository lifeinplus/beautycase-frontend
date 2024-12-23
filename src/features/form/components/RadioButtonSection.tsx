import { type UseFormRegister } from 'react-hook-form'

import { type FormData, type Option } from '../../questionnaire'
import { Label } from './Label'
import { RadioButtonItem } from './RadioButtonItem'

interface RadioButtonSectionProps {
    label: string
    options: Option[]
    register: UseFormRegister<FormData>
}

export const RadioButtonSection = ({
    label,
    options,
    register,
}: RadioButtonSectionProps) => (
    <div>
        <Label text={label} />
        <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
            <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                {options.map((o) => (
                    <RadioButtonItem
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
