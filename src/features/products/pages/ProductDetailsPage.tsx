import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import config from '../../../config'
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
            subtitle={data?.brand?.name}
            deleteMutation={useDeleteProductMutation}
            mediaContent={
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <img
                            alt={data?.name}
                            className="img"
                            onError={(e) => {
                                e.currentTarget.alt = 'Default Image'
                                e.currentTarget.src =
                                    config.cloudinary.defaultThumbnailUrl
                            }}
                            src={data?.imageUrl}
                        />
                    </div>
                </section>
            }
            descriptionContent={
                <section className="content-description">
                    {data?.shade && <p>{`Оттенок: ${data?.shade}`}</p>}
                    {data?.comment && <p>{data?.comment}</p>}
                </section>
            }
            additionalContent={
                data?.storeLinks?.length !== 0 && (
                    <section className="content-description">
                        <p className="my-3 font-bold">Ссылки на товар</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            {data?.storeLinks?.map((l, i) => (
                                <a
                                    key={i}
                                    href={l.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="store-link">
                                        {l.name}
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
