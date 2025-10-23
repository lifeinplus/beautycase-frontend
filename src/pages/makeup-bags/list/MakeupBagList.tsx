import { useTranslation } from 'react-i18next'

import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagMobileView } from '@/features/makeup-bags/components/mobile-view/MakeupBagMobileView'
import { MakeupBagTable } from '@/features/makeup-bags/components/table/MakeupBagTable'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'

export const MakeupBagList = () => {
    const { t } = useTranslation(['makeupBag'])
    const { data = [], isLoading, error } = useGetAllMakeupBagsQuery()

    const backAction = useToBackstageGalleryAction()

    const title = getTitleWithCount(t('hero.headline'), data.length)

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 sm:my-0 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
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
