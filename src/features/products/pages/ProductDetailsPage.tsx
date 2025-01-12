import { useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../../products'

export const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useGetProductByIdQuery(id!)

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle="Продукт"
            redirectPath="/products"
            title={data?.name}
            subtitle={data?.brandId?.name}
            description={`Купить: ${data?.buy}`}
            deleteMutation={useDeleteProductMutation}
            mediaContent={
                <section className="page-content__image">
                    <div className="img-container img-container-rectangle">
                        <img
                            src={data?.image}
                            alt={data?.name}
                            className="img"
                        />
                    </div>
                </section>
            }
        />
    )
}
