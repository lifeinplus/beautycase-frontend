import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { Image } from '../../../components/ui/Image'
import { TopPanel } from '../../../components/TopPanel'
import { DataWrapper } from '../../../components/DataWrapper'
import { selectFormData, setFormData } from '../../form/formSlice'
import { useReadMakeupBagsQuery } from '../../makeupBags/makeupBagsApi'
import { useReadStagesQuery } from '../stagesApi'
import type { Stage } from '../types'

export const StageSelectionPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const [filteredStages, setFilteredStages] = useState<Stage[]>([])

    const { data: makeupBags = [] } = useReadMakeupBagsQuery()
    const { data: stages = [], isLoading, error } = useReadStagesQuery()

    useEffect(() => {
        const otherMakeupBags = makeupBags.filter(
            (b) => b._id !== formData.makeupBagId
        )

        const otherStageIds = otherMakeupBags.flatMap((b) =>
            b.stages?.map((s) => s._id)
        )

        setFilteredStages(stages.filter((s) => !otherStageIds.includes(s._id)))
    }, [formData.makeupBagId, makeupBags, stages, setFilteredStages])

    const [orderedIds, setOrderedIds] = useState<Map<string, number>>(() => {
        const initialIds = formData.stageIds || []
        return new Map(
            initialIds.map((id: string, index: number) => [id, index + 1])
        )
    })

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

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={filteredStages}
                        emptyMessage="Этапы не найден"
                    >
                        <section className="gallery-container-stages">
                            {filteredStages.map(
                                ({ _id, title, subtitle, imageUrl }) => {
                                    const isSelected = orderedIds.has(_id!)
                                    const order = orderedIds.get(_id!)

                                    return (
                                        <div
                                            key={_id}
                                            className="grid grid-cols-3 gap-3"
                                            onClick={() =>
                                                toggleOrderedIds(_id!)
                                            }
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
                                }
                            )}
                        </section>
                    </DataWrapper>
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
