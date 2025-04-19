import { type NavigationButtonProps } from '../NavigationButton'

export const NavigationButton = ({ text, onClick }: NavigationButtonProps) => (
    <button onClick={onClick}>{text}</button>
)
