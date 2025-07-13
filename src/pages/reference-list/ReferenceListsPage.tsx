import { useTranslation } from 'react-i18next'

import { ReferenceListsMobileView } from '@/features/referenceLists/components/ReferenceListsMobileView'
import { ReferenceListsTable } from '@/features/referenceLists/components/ReferenceListsTable'
import type { ReferenceList } from '@/features/referenceLists/types'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'
import pageStyles from '@/shared/components/ui/page.module.css'

export const ReferenceListsPage = () => {
    const { t } = useTranslation('referenceList')

    const data: ReferenceList[] = [
        { id: 'brands', name: t('names.brands') },
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

            <NavBar />
        </article>
    )
}
