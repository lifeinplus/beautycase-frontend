import { type UseFormRegisterReturn } from 'react-hook-form'

import { Label } from './Label'

interface TextareaSectionProps {
    label: string
    register: UseFormRegisterReturn
}

export const TextareaSection = ({ label, register }: TextareaSectionProps) => (
    <div>
        <Label text={label}>
            <textarea
                className={`form-input`}
                placeholder={label}
                {...register}
            />
        </Label>
    </div>
)
