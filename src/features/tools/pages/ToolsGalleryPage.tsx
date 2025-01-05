import { GalleryPage } from '../../../components'
import { ToolCard } from '../components/ToolCard'
import { useGetToolsQuery } from '../toolsApiSlice'

export const ToolsGalleryPage = () => {
    const { data: tools, isLoading, error } = useGetToolsQuery()

    return (
        <GalleryPage
            redirectPath="/tools"
            title="Инструменты"
            subtitle="Кисти и спонжи"
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className="page-gallery__container">
                    {tools?.map((tool) => (
                        <ToolCard key={tool._id} tool={tool} />
                    ))}
                </section>
            }
        />
    )
}
