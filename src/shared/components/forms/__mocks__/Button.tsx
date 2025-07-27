import type { ButtonProps } from '@/shared/components/forms/Button'

export const Button = ({ children, ...props }: ButtonProps) => (
    <button {...props} data-testid="mocked-button">
        {children}
    </button>
)
