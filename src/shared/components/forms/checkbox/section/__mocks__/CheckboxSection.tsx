import { type CheckboxSectionProps } from '../CheckboxSection'

export const CheckboxSection = ({ label }: CheckboxSectionProps) => (
    <textarea data-testid="mocked-checkbox-section" placeholder={label} />
)
