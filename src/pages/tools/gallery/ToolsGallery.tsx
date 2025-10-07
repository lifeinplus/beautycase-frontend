import { useTranslation } from 'react-i18next'

import { useGetAllToolsQuery } from '@/features/tools/api/toolsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import styles from './ToolsGallery.module.css'

export const ToolsGallery = () => {
    const { t } = useTranslation('tool')
    const { data = [], isLoading, error } = useGetAllToolsQuery()

    const title = [t('titles.gallery'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article className={pageStyles.page}>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={title}
                        byline={t('titles.gallerySubtitle')}
                    />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <section className={styles.container}>
                            {data?.map((tool) => (
                                <ImageCard
                                    key={tool._id}
                                    data={tool}
                                    path={`/tools/${tool._id}`}
                                />
                            ))}
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
