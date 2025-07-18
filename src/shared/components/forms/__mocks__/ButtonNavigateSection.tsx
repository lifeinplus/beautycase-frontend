import { type ButtonNavigateSectionProps } from '@/shared/components/forms/ButtonNavigateSection'

export const ButtonNavigateSection = ({
    label,
    onNavigate,
    text,
}: ButtonNavigateSectionProps) => (
    <label>
        <span>{label}</span>
        <button
            data-testid="mocked-button-navigate-section"
            onClick={onNavigate}
            type="button"
        >
            <span>{text}</span>
        </button>
    </label>
)
