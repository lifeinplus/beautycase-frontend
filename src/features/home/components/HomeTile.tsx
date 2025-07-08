import classNames from 'classnames'
import { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router-dom'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './HomeTile.module.css'

export interface HomeTileProps {
    to: string
    label: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const HomeTile = ({ to, label, icon: Icon }: HomeTileProps) => (
    <Link
        to={to}
        className={classNames(commonStyles.focusOutline, styles.tile)}
    >
        <div className={styles.icon}>
            <Icon className="h-16 w-16" />
        </div>
        <span className={styles.label}>{label}</span>
    </Link>
)
