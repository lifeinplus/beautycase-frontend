import { useTranslation } from 'react-i18next'

import { useGetAllLessonsQuery } from '@/features/lessons/lessonsApi'
import { GalleryPage } from '@/shared/components/gallery/GalleryPage'
import { VideoCard } from '@/shared/components/gallery/VideoCard'

export const LessonsGalleryPage = () => {
    const { t } = useTranslation('lesson')

    const { data: lessons, isLoading, error } = useGetAllLessonsQuery()

    return (
        <GalleryPage
            redirectPath="/lessons"
            title={t('titles.gallery')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className="gallery-container-video">
                    {lessons?.map((lesson) => (
                        <VideoCard
                            key={lesson._id}
                            data={lesson}
                            path={`/lessons/${lesson._id}`}
                        />
                    ))}
                </section>
            }
        />
    )
}
