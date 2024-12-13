import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import { ToolCard } from '../components/ToolCard'
import { useGetToolsQuery } from '../toolsApiSlice'

export const ToolsGalleryPage = () => {
    const navigate = useNavigate()
    const { data: tools, isLoading, error } = useGetToolsQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading tools</div>

    const title = 'Инструменты'

    return (
        <article className="page">
            <TopPanel title={title} onBack={() => navigate('/')} />

            <main className="page-content">
                <section className="page-gallery__title">
                    <h1 className="page-gallery__title__text">{title}</h1>
                </section>
                <section className="page-gallery__container">
                    {tools?.map((tool) => (
                        <ToolCard key={tool._id} tool={tool} />
                    ))}
                </section>
            </main>

            <AdaptiveNavBar>
                <button
                    className="nav-btn"
                    onClick={() => navigate('/tools/add')}
                >
                    <PlusIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Добавить</span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}
