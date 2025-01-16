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
            descriptionContent={
                data?.stores?.length && (
                    <section className="page-content__description">
                        <p className="my-2 font-bold sm:text-left">
                            Ссылки на магазины
                        </p>

                        <div className="flex gap-3">
                            {data?.stores?.map((store, index) => (
                                <a
                                    key={index}
                                    href={store.link}
                                    target="_blank"
                                >
                                    <span className="inline-flex items-center gap-1 rounded-2xl bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
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
