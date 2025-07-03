import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { NavBar } from '../../../components/navigation/NavBar'
import { NavButton } from '../../../components/navigation/NavButton'
import { Image } from '../../../components/ui/Image'
import { DataWrapper } from '../../../components/DataWrapper'
import { TopPanel } from '../../../components/TopPanel'
import { selectFormData, setFormData } from '../../form/formSlice'
import { useGetAllToolsQuery } from '../toolsApi'

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
                        data={tools}
                        emptyMessage={t('emptyMessageList')}
                    >
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
                                        <Image alt={name} src={imageUrl} />
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
