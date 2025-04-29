import { type InputSectionProps } from '../InputSection'

export const InputSection = ({ label, register }: InputSectionProps) => (
    <input
        {...register}
        data-testid="mocked-input-section"
        placeholder={label}
    />
)
