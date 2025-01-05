import { useParams } from 'react-router-dom'

import { DetailsPage, LoadingOrError } from '../../../components'
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../productApiSlice'

export const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useGetProductByIdQuery(id!)

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Продукт не найден" />

    const { name, image, buy } = data

    return (
        <DetailsPage
            topPanelTitle="Продукт"
            redirectPath="/products"
            title={name}
            description={`Купить: ${buy}`}
            deleteMutation={useDeleteProductMutation}
            mediaContent={
                <section className="page-content__image">
                    <div className="img-container img-container-rectangle">
                        <img src={image} alt={name} className="img" />
                    </div>
                </section>
            }
        />
    )
}
