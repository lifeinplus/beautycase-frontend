import { useTranslation } from 'react-i18next'

import { useGetAllLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { VideoCard } from '@/shared/components/gallery/video-card/VideoCard'
import { Gallery } from '@/widgets/view/gallery/Gallery'
import styles from './LessonGallery.module.css'

export const LessonGallery = () => {
    const { t } = useTranslation('lesson')

    const { data = [], isLoading, error } = useGetAllLessonsQuery()

    const title = [t('titles.gallery'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <Gallery
            title={title}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className={styles.container}>
                    {data?.map((lesson) => (
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
