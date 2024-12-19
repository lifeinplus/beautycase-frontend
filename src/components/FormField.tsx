import { ChangeEvent } from 'react'

interface FormInputProps {
    label: string
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
}

export const FormField = ({ label, name, onChange, value }: FormInputProps) => {
    return (
        <label className="block">
            <span className="form-label">{label}</span>
            <input
                name={name}
                className="form-input"
                onChange={onChange}
                placeholder={label}
                required
                type="text"
                value={value}
            />
        </label>
    )
}
