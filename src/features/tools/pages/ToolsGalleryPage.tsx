import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Header,
    Hero,
    NavigationButton,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { ToolCard } from '../components/ToolCard'
import { useGetToolsQuery } from '../toolsApiSlice'

export const ToolsGalleryPage = () => {
    const navigate = useNavigate()

    const headline = 'Инструменты'
    const byline = 'Кисти и спонжи'

    const dispatch = useAppDispatch()
    const { data: tools, isLoading, error } = useGetToolsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    const handleAdd = () => {
        navigate('/tools/add')
    }

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-xl">
                        <Hero headline={headline} byline={byline} />

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
                    </article>
                </section>
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
