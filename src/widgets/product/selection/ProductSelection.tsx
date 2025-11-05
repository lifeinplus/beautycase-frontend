import classNames from 'classnames'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { clearFormData, selectFormData } from '@/features/form/slice/formSlice'
import { useGetMineProductsQuery } from '@/features/products/api/productsApi'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { Image } from '@/shared/components/ui/image/Image'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export interface ProductSelectionProps {
    onSave: (id: string, productIds: string[]) => Promise<void>
    isSaving?: boolean
}

export const ProductSelection = ({
    onSave,
    isSaving = false,
}: ProductSelectionProps) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('product')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: products, isLoading, error } = useGetMineProductsQuery()

    const [orderedIds, setOrderedIds] = useState<Map<string, number>>(() => {
        const initialIds = formData.productIds || []
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

    const handleSave = async () => {
        if (!id) return

        try {
            const productIds = Array.from(orderedIds.keys())
            await onSave(id, productIds)
            dispatch(clearFormData())
            navigate(-1)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article>
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <TitleSection title={t('titles.selection')} hideOnMobile />

                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 md:gap-7">
                            {products?.map(({ _id, name, imageUrl }) => {
                                const isSelected = orderedIds.has(_id!)
                                const order = orderedIds.get(_id!)

                                return (
                                    <div
                                        key={_id}
                                        className={classNames(
                                            'relative mx-auto w-full overflow-hidden',
                                            'aspect-square'
                                        )}
                                        onClick={() => toggleOrderedIds(_id!)}
                                    >
                                        <Image alt={name} src={imageUrl} />
                                        <span
                                            className={classNames(
                                                'absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-lg',
                                                isSelected
                                                    ? 'bg-rose-500 text-white'
                                                    : 'bg-transparent text-gray-400'
                                            )}
                                        >
                                            {order ?? ''}
                                        </span>
                                    </div>
                                )
                            })}
                        </article>

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'md:flex md:justify-end md:border-0 md:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
                            <ButtonSubmit
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('navigation:actions.saving')
                                        : t('navigation:actions.save')
                                }
                                onClick={handleSave}
                            />
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
