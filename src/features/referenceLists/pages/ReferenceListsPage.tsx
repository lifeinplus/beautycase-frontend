import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { ReferenceListsMobileView } from '../components/ReferenceListsMobileView'
import { ReferenceListsTable } from '../components/ReferenceListsTable'
import type { ReferenceList } from '../types'

export const ReferenceListsPage = () => {
    const data: ReferenceList[] = [
        { id: 'brands', name: 'Бренды' },
        { id: 'stores', name: 'Магазины' },
    ]

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline="Справочники" />
                    <ReferenceListsMobileView data={data} />
                    <ReferenceListsTable data={data} />
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
