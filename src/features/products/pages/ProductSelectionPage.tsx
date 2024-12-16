import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, TopPanel } from '../../../components'
import { useFetchProductsQuery } from '../productApiSlice'
import {
    selectSelectedProductIds,
    setSelectedProductIds,
} from '../productSlice'

export const ProductSelectionPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const selectedProductIds = useAppSelector(selectSelectedProductIds)
    const { data: products, isLoading, error } = useFetchProductsQuery()

    const [selectedIds, setSelectedIds] = useState<string[]>(selectedProductIds)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products</div>

    const title = 'Выбрать продукты'

    const toggleSelectedIds = (selectedId: string) => {
        if (selectedIds.some((id) => id === selectedId)) {
            setSelectedIds(selectedIds.filter((id) => id !== selectedId))
        } else {
            setSelectedIds([...selectedIds, selectedId])
        }
    }

    const handleBack = () => {
        navigate(-1)
    }
    const handleSave = () => {
        dispatch(setSelectedProductIds(selectedIds))
        navigate(-1)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <section className="page-gallery__title">
                    <h1 className="page-gallery__title__text">{title}</h1>
                </section>
                <section className="page-gallery__container">
                    {products?.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => toggleSelectedIds(product._id!)}
                            className={`makeup-item__image-container--square ${
                                selectedIds.some((id) => id === product._id)
                                    ? 'border border-blue-500'
                                    : ''
                            }`}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="makeup-item__image sm:rounded"
                            />
                        </div>
                    ))}
                </section>
            </main>

            <AdaptiveNavBar>
                <button className="nav-btn nav-btn-back" onClick={handleBack}>
                    <ArrowLeftIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Назад</span>
                </button>
                <button className="nav-btn" onClick={handleSave}>
                    <CheckIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Сохранить</span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}
