import { useTranslation } from 'react-i18next'

import { useGetAllLessonsQuery } from '@/features/lessons/lessonsApi'
import { VideoCard } from '@/shared/components/gallery/VideoCard'
import { Gallery } from '@/widgets/view/gallery/Gallery'
import styles from './LessonGallery.module.css'

export const LessonGallery = () => {
    const { t } = useTranslation('lesson')

    const { data: lessons, isLoading, error } = useGetAllLessonsQuery()

    return (
        <Gallery
            title={t('titles.gallery')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className={styles.container}>
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
