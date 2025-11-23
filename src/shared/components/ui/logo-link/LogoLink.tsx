import { ROUTES } from '@/shared/config/routes'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface LogoLinkProps {
    children?: ReactNode
}

export const LogoLink = ({ children }: LogoLinkProps) => (
    <Link
        className={classNames(
            'transition-all dark:focus-visible:outline-rose-700',
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-8 focus-visible:outline-rose-600 focus-visible:outline-dashed'
        )}
        to={ROUTES.home}
    >
        {children || 'Beautycase'}
    </Link>
)
