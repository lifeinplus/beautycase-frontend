import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface LogoLinkProps {
    children?: ReactNode
}

export const LogoLink = ({ children }: LogoLinkProps) => (
    <Link className="focus-outline" to="/">
        {children || 'Beautycase'}
    </Link>
)
