import { type NavButtonProps } from '@/shared/components/navigation/NavButton'

export const NavButton = ({ className, onClick, label }: NavButtonProps) => (
    <button
        data-testid={`mocked-nav-button-${label}`}
        className={className}
        onClick={onClick}
    >
        {label}
    </button>
)
