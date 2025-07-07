import classNames from 'classnames'
import { ComponentType, SVGProps } from 'react'

import commonStyles from '@/shared/components/common/common.module.css'

export interface NavButtonProps {
    ariaLabel?: string
    className?: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    onClick: () => void
}

export const NavButton = ({
    ariaLabel,
    className = '',
    icon: Icon,
    label,
    onClick,
}: NavButtonProps) => (
    <button
        aria-label={ariaLabel}
        className={classNames('nav-btn', commonStyles.focusOutline, className)}
        onClick={onClick}
    >
        <Icon className="h-6 w-6" />
        <span className="hidden lg:inline">{label}</span>
    </button>
)
