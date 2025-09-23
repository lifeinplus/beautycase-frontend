import { useTranslation } from 'react-i18next'

import { useGetAllToolsQuery } from '@/features/tools/api/toolsApi'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Gallery } from '@/widgets/view/gallery/Gallery'
import styles from './ToolsGallery.module.css'

export const ToolsGallery = () => {
    const { t } = useTranslation('tool')
    const { data = [], isLoading, error } = useGetAllToolsQuery()

    const title = [t('titles.gallery'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <Gallery
            title={title}
            subtitle={t('titles.gallerySubtitle')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className={styles.container}>
                    {data?.map((tool) => (
                        <ImageCard
                            key={tool._id}
                            data={tool}
                            path={`/tools/${tool._id}`}
                        />
                    ))}
                </section>
            }
        />
    )
}
