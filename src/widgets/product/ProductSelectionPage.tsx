import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearFormData, selectFormData } from '@/features/form/formSlice'
import { useGetAllProductsQuery } from '@/features/products/productsApi'
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
import type { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export interface ProductSelectionPageProps {
    onSave: (id: string, productIds: string[]) => Promise<void>
}

export const ProductSelectionPage = ({ onSave }: ProductSelectionPageProps) => {
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
                    <section className={galleryStyles.header}>
                        <h1 className={galleryStyles.title}>
                            {t('titles.selection')}
                        </h1>
                    </section>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={products}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <section className={galleryStyles.container}>
                            {products?.map(({ _id, name, imageUrl }) => {
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
