import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import { useGetAllToolsQuery } from '@/features/tools/api/toolsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import { Image } from '@/shared/components/ui/image/Image'
import imageStyles from '@/shared/components/ui/image/Image.module.css'
import orderStyles from '@/shared/components/ui/order/order.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import styles from './ToolSelection.module.css'

export const ToolSelection = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const { data: tools, isLoading, error } = useGetAllToolsQuery()

    const [orderedIds, setOrderedIds] = useState<Map<string, number>>(() => {
        const initialIds = formData.toolIds || []
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
                toolIds: Array.from(orderedIds.keys()),
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
                        data={tools}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <article className={styles.container}>
                            {tools?.map(({ _id, name, imageUrl }) => {
                                const isSelected = orderedIds.has(_id!)
                                const order = orderedIds.get(_id!)

                                return (
                                    <div
                                        key={_id}
                                        onClick={() => toggleOrderedIds(_id!)}
                                        className={classNames(
                                            imageStyles.container,
                                            imageStyles.square
                                        )}
                                    >
                                        <Image alt={name} src={imageUrl} />

                                        <span
                                            className={classNames(
                                                orderStyles.order,
                                                isSelected
                                                    ? orderStyles.numbered
                                                    : orderStyles.default
                                            )}
                                        >
                                            {order ?? ''}
                                        </span>
                                    </div>
                                )
                            })}
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
