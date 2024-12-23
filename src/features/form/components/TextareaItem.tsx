import { type UseFormRegisterReturn } from 'react-hook-form'

interface TextareaItemProps {
    label: string
    register: UseFormRegisterReturn
}

export const TextareaItem = ({ label, register }: TextareaItemProps) => (
    <div>
        <label className="block">
            <span className="form-label">{label}</span>
            <textarea className={`form-input`} {...register} />
        </label>
    </div>
)
