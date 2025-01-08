import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { selectFormData, setFormData } from '../../form'
import { useGetStagesQuery } from '../stagesApiSlice'

export const StageSelectionPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: stages, isLoading, error } = useGetStagesQuery()

    const [orderedIds, setOrderedIds] = useState<Map<string, number>>(() => {
        const initialIds = formData.selectedStageIds || []
        return new Map(
            initialIds.map((id: string, index: number) => [id, index + 1])
        )
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading stages</div>

    const title = 'Выбрать этапы'

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
                selectedStageIds: Array.from(orderedIds.keys()),
            })
        )
        navigate(-1)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container">
                        <section className="page-gallery__title">
                            <h1 className="page-gallery__title__text">
                                {title}
                            </h1>
                        </section>

                        <section className="page-gallery__container">
                            {stages?.map(({ _id, title, image }) => {
                                const isSelected = orderedIds.has(_id!)
                                const order = orderedIds.get(_id!)

                                return (
                                    <div
                                        key={_id}
                                        onClick={() => toggleOrderedIds(_id!)}
                                        className="img-container img-container-square"
                                    >
                                        <img
                                            src={image}
                                            alt={title}
                                            className="img img-sm-rounded"
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
                </section>
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
