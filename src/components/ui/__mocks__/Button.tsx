import { type ButtonProps } from '../Button'

export const Button = ({ children, onClick, type }: ButtonProps) => {
    return (
        <button data-testid="mocked-button" onClick={onClick} type={type}>
            {children}
        </button>
    )
}
