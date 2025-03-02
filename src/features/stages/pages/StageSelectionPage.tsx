import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Image,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { selectFormData, setFormData } from '../../form'
import { useReadStagesQuery } from '../stagesApiSlice'

export const StageSelectionPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: stages, isLoading, error } = useReadStagesQuery()

    const [orderedIds, setOrderedIds] = useState<Map<string, number>>(() => {
        const initialIds = formData.stageIds || []
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
                stageIds: Array.from(orderedIds.keys()),
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

                    <section className="gallery-container-stages">
                        {stages?.map(({ _id, title, subtitle, imageUrl }) => {
                            const isSelected = orderedIds.has(_id!)
                            const order = orderedIds.get(_id!)

                            return (
                                <div
                                    key={_id}
                                    className="grid grid-cols-3 gap-3"
                                    onClick={() => toggleOrderedIds(_id!)}
                                >
                                    <div className="img-container img-container-square">
                                        <Image
                                            alt={title}
                                            className="img rounded"
                                            src={imageUrl}
                                        />

                                        <span
                                            className={`img-order-left ${
                                                isSelected
                                                    ? 'img-order-selected'
                                                    : 'img-order-default'
                                            }`}
                                        >
                                            {order ?? ''}
                                        </span>
                                    </div>

                                    <div className="col-span-2">
                                        <h2>{title}</h2>
                                        <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {subtitle}
                                        </h3>
                                    </div>
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
