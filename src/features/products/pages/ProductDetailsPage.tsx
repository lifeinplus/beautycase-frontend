import { useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../../products'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

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
            deleteMutation={useDeleteProductMutation}
            mediaContent={
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <img
                            src={data?.image}
                            alt={data?.name}
                            className="img"
                        />
                    </div>
                </section>
            }
            additionalContent={
                data?.stores?.length !== 0 && (
                    <section className="content-description">
                        <p className="my-3 font-bold">Ссылки на товар</p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {data?.stores?.map((store, index) => (
                                <a
                                    key={index}
                                    href={store.link}
                                    target="_blank"
                                >
                                    <span className="store-link">
                                        {store.name}
                                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>
                )
            }
        />
    )
}
