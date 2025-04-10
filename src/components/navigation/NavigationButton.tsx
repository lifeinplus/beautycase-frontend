import { FormEvent, ReactNode } from 'react'

export interface NavigationButtonProps {
    className?: string
    icon: ReactNode
    onClick: (e: FormEvent) => void
    text: string
}

export const NavigationButton = ({
    className = '',
    icon,
    onClick,
    text,
}: NavigationButtonProps) => (
    <button className={`nav-btn ${className}`} onClick={onClick}>
        {icon}
        <span className="hidden lg:inline">{text}</span>
    </button>
)
