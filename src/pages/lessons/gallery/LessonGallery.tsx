import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useGetMineLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { VideoCard } from '@/shared/components/gallery/video-card/VideoCard'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ROUTES } from '@/shared/config/routes'
import { titleWithCount } from '@/shared/utils/ui/titleWithCount'

export const LessonGallery = () => {
    const { t } = useTranslation('lesson')
    const dispatch = useAppDispatch()
    const backAction = useToBackstageGalleryAction()

    const { data = [], isLoading, error } = useGetMineLessonsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const title = titleWithCount(t('titles.gallery'), data.length)

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 md:my-0 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <section className="mx-auto my-4 grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
                            {data?.map((d) => (
                                <VideoCard
                                    key={d._id}
                                    data={d}
                                    to={ROUTES.backstage.lessons.details(
                                        d._id!
                                    )}
                                />
                            ))}
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
