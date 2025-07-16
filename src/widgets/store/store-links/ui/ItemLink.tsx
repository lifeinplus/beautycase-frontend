import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import type { StoreLink } from '@/features/stores/types'
import commonStyles from '@/shared/components/common/common.module.css'
import styles from './ItemLink.module.css'

export interface ItemLinkProps {
    item: StoreLink
}

export const ItemLink = ({ item }: ItemLinkProps) => {
    return (
        <div className="flex">
            <a
                className={classNames(
                    commonStyles.focusOutline,
                    commonStyles.hoverOutline,
                    styles.link
                )}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={styles.label}>
                    {item.name}
                    <ArrowTopRightOnSquareIcon className={styles.icon} />
                </span>
            </a>
        </div>
    )
}
