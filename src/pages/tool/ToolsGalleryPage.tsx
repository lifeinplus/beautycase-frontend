import { useTranslation } from 'react-i18next'

import { useGetAllToolsQuery } from '@/features/tools/toolsApi'
import { ImageCard } from '@/shared/components/gallery/ImageCard'
import { Gallery } from '@/widgets/view/gallery/Gallery'
import styles from './ToolsGalleryPage.module.css'

export const ToolsGalleryPage = () => {
    const { t } = useTranslation('tool')

    const { data: tools, isLoading, error } = useGetAllToolsQuery()

    return (
        <Gallery
            title={t('titles.gallery')}
            subtitle={t('titles.gallerySubtitle')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className={styles.container}>
                    {tools?.map((tool) => (
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
