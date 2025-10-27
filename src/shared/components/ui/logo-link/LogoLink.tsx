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
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
            'dark:focus-visible:outline-rose-700'
        )}
        to={ROUTES.home}
    >
        {children || 'Beautycase'}
    </Link>
)
