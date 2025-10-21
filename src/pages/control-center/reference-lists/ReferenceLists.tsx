import { useTranslation } from 'react-i18next'

import { ReferenceListsMobileView } from '@/features/reference-lists/components/mobile-view/ReferenceListsMobileView'
import { ReferenceListsTable } from '@/features/reference-lists/components/table/ReferenceListsTable'
import type { ReferenceList } from '@/features/reference-lists/types'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { useBackToControlCenterAction } from '../gallery/hooks/useBackToControlCenterAction'

export const ReferenceLists = () => {
    const { t } = useTranslation('referenceList')

    const data: ReferenceList[] = [
        { id: 'brands', name: t('names.brands') },
        { id: 'categories', name: t('names.categories') },
        { id: 'stores', name: t('names.stores') },
    ]

    const backAction = useBackToControlCenterAction()

    const title = [t('hero.headline'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 sm:my-0 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} hideOnMobile />
                    <ReferenceListsMobileView data={data} />
                    <ReferenceListsTable data={data} />
                </article>
            </main>
        </article>
    )
}
