import { useTranslation } from 'react-i18next'

import { StoreLink } from '@/features/stores/types'
import pageStyles from '@/shared/components/ui/page.module.css'
import styles from './StoreLinks.module.css'
import { AddButton } from './ui/AddButton'
import { ItemLink } from './ui/ItemLink'

export interface StoreLinksProps {
    storeLinks?: StoreLink[]
    type: 'product' | 'tool'
}

export const StoreLinks = ({ storeLinks, type }: StoreLinksProps) => {
    const { t } = useTranslation('store')

    return (
        <section className={pageStyles.description}>
            <p className={styles.title}>{t(`titles.links.${type}`)}</p>
            <div className={styles.items}>
                {storeLinks?.map((link, i) => <ItemLink key={i} item={link} />)}
                <AddButton storeLinks={storeLinks} />
            </div>
        </section>
    )
}
