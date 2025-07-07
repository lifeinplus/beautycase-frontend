import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import commonStyles from '@/shared/components/common/common.module.css'

export interface LogoLinkProps {
    children?: ReactNode
}

export const LogoLink = ({ children }: LogoLinkProps) => (
    <Link className={commonStyles.focusOutline} to="/">
        {children || 'Beautycase'}
    </Link>
)
