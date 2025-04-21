import { type SelectSectionProps } from '../SelectSection'

export const SelectSection = ({
    label,
    register,
    options,
    value = '',
}: SelectSectionProps) => (
    <label data-testid="mocked-select-section">
        <span>{label}</span>
        <select {...register} value={value}>
            {options?.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.text}
                </option>
            ))}
        </select>
    </label>
)
