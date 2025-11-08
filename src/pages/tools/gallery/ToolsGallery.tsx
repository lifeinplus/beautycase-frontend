import { useTranslation } from 'react-i18next'

import { useGetMineToolsQuery } from '@/features/tools/api/toolsApi'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ROUTES } from '@/shared/config/routes'
import { titleWithCount } from '@/shared/utils/ui/titleWithCount'

export const ToolsGallery = () => {
    const { t } = useTranslation('tool')
    const backAction = useToBackstageGalleryAction()

    const { data = [], isLoading, error } = useGetMineToolsQuery()

    const title = titleWithCount(t('titles.gallery'), data.length)
    const subtitle = t('titles.gallerySubtitle')

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} subtitle={subtitle} hideOnMobile />

                    <div className="md:hidden">
                        <Hero subtitle={subtitle} />
                    </div>

                    <DataWrapper isLoading={isLoading} error={error}>
                        <section className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 md:gap-7">
                            {data?.map((d) => (
                                <ImageCard
                                    key={d._id}
                                    data={d}
                                    to={ROUTES.backstage.tools.details(d._id!)}
                                />
                            ))}
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
