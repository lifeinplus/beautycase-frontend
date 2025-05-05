import { type RadioButtonSectionProps } from '../RadioButtonSection'

export const RadioButtonSection = ({ label }: RadioButtonSectionProps) => (
    <textarea data-testid="mocked-radio-button-section" placeholder={label} />
)
