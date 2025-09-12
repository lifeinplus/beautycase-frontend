import { useTranslation } from 'react-i18next'

import { ReferenceListsMobileView } from '@/features/reference-lists/components/mobile-view/ReferenceListsMobileView'
import { ReferenceListsTable } from '@/features/reference-lists/components/table/ReferenceListsTable'
import type { ReferenceList } from '@/features/reference-lists/types'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const ReferenceLists = () => {
    const { t } = useTranslation('referenceList')

    const data: ReferenceList[] = [
        { id: 'brands', name: t('names.brands') },
        { id: 'categories', name: t('names.categories') },
        { id: 'stores', name: t('names.stores') },
    ]

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={t('hero.headline')} />
                    <ReferenceListsMobileView data={data} />
                    <ReferenceListsTable data={data} />
                </article>
            </main>
        </article>
    )
}
