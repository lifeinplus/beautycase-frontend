import { useTranslation } from 'react-i18next'

import { ReferenceListsMobileView } from '@/features/reference-lists/components/mobile-view/ReferenceListsMobileView'
import { ReferenceListsTable } from '@/features/reference-lists/components/table/ReferenceListsTable'
import type { ReferenceList } from '@/features/reference-lists/types'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'

export const ReferenceLists = () => {
    const { t } = useTranslation('referenceList')

    const data: ReferenceList[] = [
        { id: 'brands', name: t('names.brands') },
        { id: 'categories', name: t('names.categories') },
        { id: 'stores', name: t('names.stores') },
    ]

    const title = t('hero.headline')

    return (
        <article>
            <TopPanel title={title} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 md:my-0 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <ReferenceListsMobileView data={data} />
                    <ReferenceListsTable data={data} />
                </article>
            </main>
        </article>
    )
}
