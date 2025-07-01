import type { LogoLinkProps } from '../LogoLink'

export const LogoLink = ({ children }: LogoLinkProps) => {
    return (
        <a data-testid="mocked-logo-link" href="/">
            {children || 'Beautycase'}
        </a>
    )
}
