import { GalleryPage } from '../../../components/gallery/GalleryPage'
import { ImageCard } from '../../../components/gallery/ImageCard'
import { useReadToolsQuery } from '../toolsApi'

export const ToolsGalleryPage = () => {
    const { data: tools, isLoading, error } = useReadToolsQuery()

    return (
        <GalleryPage
            redirectPath="/tools"
            title="Инструменты"
            subtitle="Кисти и спонжи"
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
