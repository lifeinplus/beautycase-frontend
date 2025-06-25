import { useTranslation } from 'react-i18next'

import { GalleryPage } from '../../../components/gallery/GalleryPage'
import { ImageCard } from '../../../components/gallery/ImageCard'
import { useGetAllToolsQuery } from '../toolsApi'

export const ToolsGalleryPage = () => {
    const { t } = useTranslation('tool')

    const { data: tools, isLoading, error } = useGetAllToolsQuery()

    return (
        <GalleryPage
            redirectPath="/tools"
            title={t('titles.gallery')}
            subtitle={t('titles.gallerySubtitle')}
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className="gallery-container">
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
