import { type ButtonProps } from '../../../../shared/components/forms/Button'

export const Button = ({ children, onClick, type }: ButtonProps) => (
    <button data-testid="mocked-button" onClick={onClick} type={type}>
        {children}
    </button>
)
