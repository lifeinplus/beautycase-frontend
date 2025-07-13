import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { StoreLink } from '@/features/stores/types'
import commonStyles from '@/shared/components/common/common.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import classNames from 'classnames'
import styles from './StoreLinks.module.css'

export interface StoreLinksProps {
    storeLinks?: StoreLink[]
    type: 'product' | 'tool'
}

export const StoreLinks = ({ storeLinks, type }: StoreLinksProps) => {
    const { t } = useTranslation('store')

    return (
        storeLinks?.length !== 0 && (
            <section className={pageStyles.description}>
                <p className={styles.title}>{t(`titles.links.${type}`)}</p>
                <div className={styles.container}>
                    {storeLinks?.map((l, i) => (
                        <a
                            key={i}
                            className={classNames(
                                commonStyles.focusOutline,
                                commonStyles.hoverOutline
                            )}
                            href={l.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.link}>
                                {l.name}
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </span>
                        </a>
                    ))}
                </div>
            </section>
        )
    )
}
