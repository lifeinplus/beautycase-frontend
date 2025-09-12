import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { useGetAllStagesQuery } from '@/features/stages/api/stagesApi'
import type { Stage } from '@/features/stages/types'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import { Image } from '@/shared/components/ui/image/Image'
import imageStyles from '@/shared/components/ui/image/Image.module.css'
import orderStyles from '@/shared/components/ui/order/order.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import styles from './StageSelection.module.css'

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

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={t('titles.selection')} hideOnMobile />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={filteredStages}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <article className={styles.container}>
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
                                                    imageStyles.container,
                                                    imageStyles.square
                                                )}
                                            >
                                                <Image
                                                    alt={title}
                                                    className={classNames(
                                                        imageStyles.img,
                                                        'rounded'
                                                    )}
                                                    src={imageUrl}
                                                />

                                                <span
                                                    className={classNames(
                                                        orderStyles.left,
                                                        isSelected
                                                            ? orderStyles.numbered
                                                            : orderStyles.default
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

                        <section className={buttonStyles.section}>
                            <ButtonSubmit
                                className="sm:w-48"
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
