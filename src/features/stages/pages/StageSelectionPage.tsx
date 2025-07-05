import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { DataWrapper } from '../../../shared/components/common/DataWrapper'
import { NavBar } from '../../../shared/components/navigation/NavBar'
import { NavButton } from '../../../shared/components/navigation/NavButton'
import { TopPanel } from '../../../shared/components/layout/TopPanel'
import { Image } from '../../../shared/components/ui/Image'
import { selectFormData, setFormData } from '../../form/formSlice'
import { useGetAllMakeupBagsQuery } from '../../makeupBags/makeupBagsApi'
import { useGetAllStagesQuery } from '../stagesApi'
import type { Stage } from '../types'

export const StageSelectionPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('stage')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const [filteredStages, setFilteredStages] = useState<Stage[]>([])

    const { data: makeupBags = [] } = useGetAllMakeupBagsQuery()
    const { data: stages = [], isLoading, error } = useGetAllStagesQuery()

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
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="gallery-header">
                        <h1 className="gallery-title">
                            {t('titles.selection')}
                        </h1>
                    </section>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={filteredStages}
                        emptyMessage={t('emptyMessageList')}
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

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavButton
                    icon={CheckIcon}
                    label={t('navigation:actions.save')}
                    onClick={handleSave}
                />
            </NavBar>
        </article>
    )
}
