import { useTranslation } from 'react-i18next'

import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagMobileView } from '@/features/makeup-bags/components/mobile-view/MakeupBagMobileView'
import { MakeupBagTable } from '@/features/makeup-bags/components/table/MakeupBagTable'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const MakeupBagList = () => {
    const { t } = useTranslation(['makeupBag'])
    const { data = [], isLoading, error } = useGetAllMakeupBagsQuery()

    const title = [t('hero.headline'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <MakeupBagMobileView makeupBags={data} />
                        <MakeupBagTable makeupBags={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
