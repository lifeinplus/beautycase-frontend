import { useTranslation } from 'react-i18next'

import { useGetAllToolsQuery } from '@/features/tools/api/toolsApi'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'

export const ToolsGallery = () => {
    const { t } = useTranslation('tool')
    const { data = [], isLoading, error } = useGetAllToolsQuery()

    const backAction = useToBackstageGalleryAction()

    const title = getTitleWithCount(t('titles.gallery'), data.length)
    const subtitle = t('titles.gallerySubtitle')

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero title={title} subtitle={subtitle} hideOnMobile />

                    <div className="sm:hidden">
                        <Hero subtitle={subtitle} />
                    </div>

                    <DataWrapper isLoading={isLoading} error={error}>
                        <section className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 sm:gap-7">
                            {data?.map((tool) => (
                                <ImageCard
                                    key={tool._id}
                                    data={tool}
                                    to={`/tools/${tool._id}`}
                                />
                            ))}
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
