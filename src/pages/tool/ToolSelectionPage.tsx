import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFormData, setFormData } from '@/features/form/formSlice'
import { useGetAllToolsQuery } from '@/features/tools/toolsApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { Image } from '@/shared/components/ui/Image'
import imageStyles from '@/shared/components/ui/image.module.css'
import orderStyles from '@/shared/components/ui/order.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'

export const ToolSelectionPage = () => {
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
        <article className={pageStyles.page}>
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <section className={galleryStyles.header}>
                        <h1 className={galleryStyles.title}>
                            {t('titles.selection')}
                        </h1>
                    </section>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={tools}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <section className={galleryStyles.container}>
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
                        </section>
                    </DataWrapper>
                </article>
            </main>

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className={navStyles.navBtnBack}
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
