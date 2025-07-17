import classNames from 'classnames'
import {
    type ButtonHTMLAttributes,
    type ComponentType,
    type SVGProps,
} from 'react'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './NavButton.module.css'

export interface NavButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
}

export const NavButton = ({
    className,
    icon: Icon,
    label,
    ...props
}: NavButtonProps) => (
    <button
        {...props}
        className={classNames(
            styles.navBtn,
            commonStyles.focusOutline,
            className
        )}
    >
        <Icon className="h-7 w-7 sm:h-6 sm:w-6" />
        <span className="hidden lg:inline">{label}</span>
    </button>
)
