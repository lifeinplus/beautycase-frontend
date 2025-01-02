import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Header,
    Hero,
    NavigationButton,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { ProductCard } from '../components/ProductCard'
import { useGetProductsQuery } from '../productApiSlice'

export const ProductGalleryPage = () => {
    const navigate = useNavigate()

    const headline = 'Продукты'
    const byline = 'Мицеллярная вода, тоники, тональные основы и крема'

    const dispatch = useAppDispatch()
    const { data: products, isLoading, error } = useGetProductsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    const handleAdd = () => {
        navigate('/products/add')
    }

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-xl">
                        <Hero headline={headline} byline={byline} />

                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{getErrorMessage(error)}</div>
                        ) : (
                            <article className="page-gallery__container">
                                {products?.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </article>
                        )}
                    </article>
                </section>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<PlusIcon className="h-6 w-6" />}
                    text="Добавить"
                    onClick={handleAdd}
                />
            </AdaptiveNavBar>
        </article>
    )
}
