import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { ToolCard } from '../components/ToolCard'
import { useGetToolsQuery } from '../toolsApiSlice'

export const ToolsGalleryPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { data: tools, isLoading, error } = useGetToolsQuery()

    const title = 'Инструменты'

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    const handleAdd = () => {
        navigate('/tools/add')
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={() => navigate('/')} />

            <main className="page-content">
                <section className="page-gallery__title">
                    <h1 className="page-gallery__title__text">{title}</h1>
                </section>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{getErrorMessage(error)}</div>
                ) : (
                    <section className="page-gallery__container">
                        {tools?.map((tool) => (
                            <ToolCard key={tool._id} tool={tool} />
                        ))}
                    </section>
                )}
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<PlusIcon className="h-6 w-6" />}
                    text="Добавить"
                    onClick={handleAdd}
                />
            </AdaptiveNavBar>
        </article>
    )
}
