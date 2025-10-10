import { useTranslation } from 'react-i18next'

import { ReferenceListsMobileView } from '@/features/reference-lists/components/mobile-view/ReferenceListsMobileView'
import { ReferenceListsTable } from '@/features/reference-lists/components/table/ReferenceListsTable'
import type { ReferenceList } from '@/features/reference-lists/types'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'

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

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={`${t('hero.headline')} (${data.length})`} />
                    <ReferenceListsMobileView data={data} />
                    <ReferenceListsTable data={data} />
                </article>
            </main>
        </article>
    )
}
