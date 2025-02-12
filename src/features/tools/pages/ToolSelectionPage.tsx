import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { selectFormData, setFormData } from '../../form'
import { useGetToolsQuery } from '../toolsApiSlice'

export const ToolSelectionPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: tools, isLoading, error } = useGetToolsQuery()

    const [orderedIds, setOrderedIds] = useState<Map<string, number>>(() => {
        const initialIds = formData.toolIds || []
        return new Map(
            initialIds.map((id: string, index: number) => [id, index + 1])
        )
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading tools</div>

    const title = 'Выбрать инструменты'

    const toggleOrderedIds = (id: string) => {
        setOrderedIds((prev) => {
            const newSelection = new Map(prev)

            if (newSelection.has(id)) {
                newSelection.delete(id)
                let count = 1
                for (const key of newSelection.keys()) {
                    newSelection.set(key, count++)
                }
            } else {
                newSelection.set(id, newSelection.size + 1)
            }

            return newSelection
        })
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleSave = () => {
        dispatch(
            setFormData({
                ...formData,
                toolIds: Array.from(orderedIds.keys()),
            })
        )
        navigate(-1)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="gallery-header">
                        <h1 className="gallery-title">{title}</h1>
                    </section>

                    <section className="gallery-container">
                        {tools?.map(({ _id, name, imageUrl }) => {
                            const isSelected = orderedIds.has(_id!)
                            const order = orderedIds.get(_id!)

                            return (
                                <div
                                    key={_id}
                                    onClick={() => toggleOrderedIds(_id!)}
                                    className="img-container img-container-square"
                                >
                                    <img
                                        alt={name}
                                        className="img"
                                        src={imageUrl}
                                    />
                                    <span
                                        className={`img-order ${
                                            isSelected
                                                ? 'img-order-selected'
                                                : 'img-order-default'
                                        }`}
                                    >
                                        {order ?? ''}
                                    </span>
                                </div>
                            )
                        })}
                    </section>
                </article>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<CheckIcon className="h-6 w-6" />}
                    text="Сохранить"
                    onClick={handleSave}
                />
            </AdaptiveNavBar>
        </article>
    )
}
