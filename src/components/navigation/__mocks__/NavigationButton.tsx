import { type NavigationButtonProps } from '../NavigationButton'

export const NavigationButton = ({
    className,
    onClick,
    text,
}: NavigationButtonProps) => (
    <button
        data-testid="mocked-nav-button"
        className={className}
        onClick={onClick}
    >
        {text}
    </button>
)
