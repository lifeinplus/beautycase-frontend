import { useTranslation } from 'react-i18next'

import { useGetAllLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { VideoCard } from '@/shared/components/gallery/video-card/VideoCard'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import styles from './LessonGallery.module.css'

export const LessonGallery = () => {
    const { t } = useTranslation('lesson')

    const { data = [], isLoading, error } = useGetAllLessonsQuery()

    const title = [t('titles.gallery'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article className={pageStyles.page}>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <section className={styles.container}>
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
