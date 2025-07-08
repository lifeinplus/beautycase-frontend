import { type NavBarProps } from '../NavBar'

export const NavBar = ({ children }: NavBarProps) => (
    <aside data-testid="mocked-nav-bar">{children}</aside>
)
