import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { useGetAllStagesQuery } from '@/features/stages/api/stagesApi'
import type { Stage } from '@/features/stages/types'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { Image } from '@/shared/components/ui/image/Image'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const StageSelection = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('stage')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const { data: makeupBags = [] } = useGetAllMakeupBagsQuery()
    const { data: stages = [], isLoading, error } = useGetAllStagesQuery()

    const [filteredStages, setFilteredStages] = useState<Stage[]>([])

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
        <article>
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <TitleSection title={t('titles.selection')} hideOnMobile />

                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className="mx-auto my-4 grid max-w-2xl grid-cols-1 gap-3 px-3 md:grid-cols-2">
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
                                            <div
                                                className={classNames(
                                                    'relative mx-auto w-full overflow-hidden',
                                                    'aspect-square'
                                                )}
                                            >
                                                <Image
                                                    alt={title}
                                                    className={classNames(
                                                        'h-full w-full object-cover sm:rounded',
                                                        'rounded-sm'
                                                    )}
                                                    src={imageUrl}
                                                />

                                                <span
                                                    className={classNames(
                                                        'absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-lg',
                                                        isSelected
                                                            ? 'bg-rose-500 text-white'
                                                            : 'bg-transparent text-gray-400'
                                                    )}
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
                        </article>

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'sm:flex sm:justify-end sm:border-0 sm:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
                            <ButtonSubmit
                                label={t('navigation:actions.save')}
                                onClick={handleSave}
                            />
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
