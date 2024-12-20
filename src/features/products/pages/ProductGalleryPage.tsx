import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Header,
    NavigationButton,
    PageTitle,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { ProductCard } from '../components/ProductCard'
import { useFetchProductsQuery } from '../productApiSlice'

export const ProductGalleryPage = () => {
    const navigate = useNavigate()

    const headline = 'Продукты'
    const byline = 'Мицеллярная вода, тоники, тональные основы и крема'

    const dispatch = useAppDispatch()
    const { data: products, isLoading, error } = useFetchProductsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    const handleAdd = () => {
        navigate('/products/add')
    }

    return (
        <section>
            <Header />

            <main className="page-content">
                <PageTitle headline={headline} byline={byline} />

                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{getErrorMessage(error)}</div>
                ) : (
                    <article className="page-gallery__container">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </article>
                )}
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<PlusIcon className="h-6 w-6" />}
                    text="Добавить"
                    onClick={handleAdd}
                />
            </AdaptiveNavBar>
        </section>
    )
}
