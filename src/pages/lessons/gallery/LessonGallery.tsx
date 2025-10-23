import { useTranslation } from 'react-i18next'

import { useGetAllLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { VideoCard } from '@/shared/components/gallery/video-card/VideoCard'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'

export const LessonGallery = () => {
    const { t } = useTranslation('lesson')
    const { data = [], isLoading, error } = useGetAllLessonsQuery()

    const backAction = useToBackstageGalleryAction()

    const title = getTitleWithCount(t('titles.gallery'), data.length)

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 sm:my-0 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <section className="mx-auto my-4 grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
                            {data?.map((lesson) => (
                                <VideoCard
                                    key={lesson._id}
                                    data={lesson}
                                    path={`/lessons/${lesson._id}`}
                                />
                            ))}
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
