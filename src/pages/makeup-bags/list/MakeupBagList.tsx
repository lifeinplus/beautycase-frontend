import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useGetMineMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagMobileView } from '@/features/makeup-bags/components/mobile-view/MakeupBagMobileView'
import { MakeupBagTable } from '@/features/makeup-bags/components/table/MakeupBagTable'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { titleWithCount } from '@/shared/utils/ui/titleWithCount'

export const MakeupBagList = () => {
    const { t } = useTranslation(['makeupBag'])
    const dispatch = useAppDispatch()

    const { data = [], isLoading, error } = useGetMineMakeupBagsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const title = titleWithCount(t('hero.headline'), data.length)

    return (
        <article>
            <TopPanel title={title} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 md:my-0 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <MakeupBagMobileView makeupBags={data} />
                        <MakeupBagTable makeupBags={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
