import { AdaptiveNavBar, Header, Hero } from '../../../components'
import {
    type ReferenceList,
    ReferenceListsMobileView,
    ReferenceListsTable,
} from '../../referenceLists'

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
                    <ReferenceListsMobileView referenceLists={data} />
                    <ReferenceListsTable referenceLists={data} />
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
