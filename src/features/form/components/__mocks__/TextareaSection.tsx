import { type TextareaSectionProps } from '../TextareaSection'

export const TextareaSection = ({ label }: TextareaSectionProps) => (
    <textarea data-testid="mocked-textarea-section" placeholder={label} />
)
