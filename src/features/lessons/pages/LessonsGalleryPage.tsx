import { useTranslation } from 'react-i18next'

import { GalleryPage } from '../../../components/gallery/GalleryPage'
import { VideoCard } from '../../../components/gallery/VideoCard'
import { useGetAllLessonsQuery } from '../lessonsApi'

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
