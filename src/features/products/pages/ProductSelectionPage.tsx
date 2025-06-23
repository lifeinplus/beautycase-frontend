import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { Image } from '../../../components/ui/Image'
import { TopPanel } from '../../../components/TopPanel'
import { selectFormData, setFormData } from '../../form/formSlice'
import { useGetAllProductsQuery } from '../productsApi'
import { DataWrapper } from '../../../components/DataWrapper'

export const ProductSelectionPage = () => {
    const navigate = useNavigate()
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

    const handleSave = () => {
        dispatch(
            setFormData({
                ...formData,
                productIds: Array.from(orderedIds.keys()),
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
                        data={products}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <section className="gallery-container">
                            {products?.map(({ _id, name, imageUrl }) => {
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

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text={t('navigation:back')}
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<CheckIcon className="h-6 w-6" />}
                    text={t('navigation:save')}
                    onClick={handleSave}
                />
            </AdaptiveNavBar>
        </article>
    )
}
