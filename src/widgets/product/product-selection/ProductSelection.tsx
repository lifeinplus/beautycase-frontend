import classNames from 'classnames'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearFormData, selectFormData } from '@/features/form/formSlice'
import { useGetAllProductsQuery } from '@/features/products/productsApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { TitleSection } from '@/shared/components/common/TitleSection'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import buttonStyles from '@/shared/components/ui/button.module.css'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import { Image } from '@/shared/components/ui/Image'
import imageStyles from '@/shared/components/ui/image.module.css'
import orderStyles from '@/shared/components/ui/order.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import styles from './ProductSelection.module.css'

export interface ProductSelectionProps {
    onSave: (id: string, productIds: string[]) => Promise<void>
    isSaving?: boolean
}

export const ProductSelection = ({
    onSave,
    isSaving = false,
}: ProductSelectionProps) => {
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('product')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: products, isLoading, error } = useGetAllProductsQuery()

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
        <article className={pageStyles.page}>
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={t('titles.selection')} hideOnMobile />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={products}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <article className={styles.container}>
                            {products?.map(({ _id, name, imageUrl }) => {
                                const isSelected = orderedIds.has(_id!)
                                const order = orderedIds.get(_id!)

                                return (
                                    <div
                                        key={_id}
                                        className={classNames(
                                            imageStyles.container,
                                            imageStyles.square
                                        )}
                                        onClick={() => toggleOrderedIds(_id!)}
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
