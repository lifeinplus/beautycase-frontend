import { ReactNode } from 'react'

export interface NavButtonProps {
    ariaLabel?: string
    className?: string
    icon: ReactNode
    label: string
    onClick: () => void
}

export const NavButton = ({
    ariaLabel,
    className = '',
    icon,
    label,
    onClick,
}: NavButtonProps) => (
    <button
        aria-label={ariaLabel}
        className={`nav-btn focus-outline ${className}`}
        onClick={onClick}
    >
        {icon}
        <span className="hidden lg:inline">{label}</span>
    </button>
)
