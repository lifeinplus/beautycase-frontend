import { useTranslation } from 'react-i18next'

import { StoreLink } from '@/features/stores/types'
import { AddButton } from './ui/AddButton'
import { ItemLink } from './ui/ItemLink'

export interface StoreLinksProps {
    storeLinks?: StoreLink[]
    type: 'product' | 'tool'
    viewMode: boolean
}

export const StoreLinks = ({
    storeLinks,
    type,
    viewMode = false,
}: StoreLinksProps) => {
    const { t } = useTranslation('store')

    return (
        <section className="my-3 px-4 text-base">
            <p className="mb-3 font-bold">{t(`titles.links.${type}`)}</p>
            <div className="flex flex-col gap-3 md:flex-row">
                {storeLinks?.map((link, i) => (
                    <ItemLink key={i} item={link} />
                ))}
                {!viewMode && <AddButton storeLinks={storeLinks} />}
            </div>
        </section>
    )
}
