import { ButtonSubmitProps } from '../ButtonSubmit'

export const ButtonSubmit = ({ onClick }: ButtonSubmitProps) => (
    <button data-testid="mocked-button-submit" onClick={onClick}></button>
)
