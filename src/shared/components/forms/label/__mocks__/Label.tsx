import { type LabelProps } from '../Label'

export const Label = ({ children, text }: LabelProps) => (
    <label data-testid="mocked-label">
        <span>{text}</span>
        {children}
    </label>
)
