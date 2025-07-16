import { useTranslation } from 'react-i18next'

import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { ImageCard } from '@/shared/components/gallery/ImageCard'
import { Gallery } from '@/widgets/view/gallery/Gallery'
import { useGetAllToolsQuery } from '../../features/tools/toolsApi'

export const ToolsGalleryPage = () => {
    const { t } = useTranslation('tool')

    const { data: tools, isLoading, error } = useGetAllToolsQuery()

    return (
        <Gallery
            redirectPath="/tools"
            title={t('titles.gallery')}
            subtitle={t('titles.gallerySubtitle')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className={galleryStyles.container}>
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
