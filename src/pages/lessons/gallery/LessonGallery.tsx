import { useTranslation } from 'react-i18next'

import { useGetAllLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { VideoCard } from '@/shared/components/gallery/video-card/VideoCard'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const LessonGallery = () => {
    const { t } = useTranslation('lesson')

    const { data = [], isLoading, error } = useGetAllLessonsQuery()

    const title = [t('titles.gallery'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article className="pb-13 sm:pb-0">
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} />
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
