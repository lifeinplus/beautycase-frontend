import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import { useGetMineToolsQuery } from '@/features/tools/api/toolsApi'
import { SelectableImageCard } from '@/shared/components/cards/selectable-image/SelectableImageCard'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const ToolSelection = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const { data: tools, isLoading, error } = useGetMineToolsQuery()

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

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <TitleSection title={t('titles.selection')} hideOnMobile />

                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 md:gap-7">
                            {tools?.map(({ _id, imageIds }) => (
                                <SelectableImageCard
                                    key={_id}
                                    id={_id!}
                                    imageId={imageIds[0]}
                                    isSelected={orderedIds.has(_id!)}
                                    order={orderedIds.get(_id!)}
                                    onToggle={toggleOrderedIds}
                                />
                            ))}
                        </article>

                        <section className="border-t border-gray-300 px-3 pt-6 md:flex md:justify-end md:border-0 md:pt-0 dark:border-gray-700">
                            <ButtonSubmit
                                label={t('actions:save')}
                                onClick={handleSave}
                            />
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
