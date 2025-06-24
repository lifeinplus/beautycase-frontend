import { useTranslation } from 'react-i18next'

import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { ReferenceListsMobileView } from '../components/ReferenceListsMobileView'
import { ReferenceListsTable } from '../components/ReferenceListsTable'
import type { ReferenceList } from '../types'

export const ReferenceListsPage = () => {
    const { t } = useTranslation('referenceList')

    const data: ReferenceList[] = [
        { id: 'brands', name: t('names.brands') },
        { id: 'stores', name: t('names.stores') },
    ]

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline={t('hero.headline')} />
                    <ReferenceListsMobileView data={data} />
                    <ReferenceListsTable data={data} />
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
