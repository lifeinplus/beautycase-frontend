import { ButtonSubmitProps } from '../ButtonSubmit'

export const ButtonSubmit = ({ label, onClick }: ButtonSubmitProps) => (
    <button data-testid="mocked-button-submit" onClick={onClick}>
        {label}
    </button>
)
