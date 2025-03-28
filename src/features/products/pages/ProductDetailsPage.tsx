import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'

import { DetailsPage, Image } from '../../../components'
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../../products'

export const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useGetProductByIdQuery(id!)
    const [deleteProduct] = useDeleteProductMutation()

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle="Продукт"
            redirectPath="/products"
            title={data?.name}
            subtitle={data?.brand?.name}
            deleteItem={deleteProduct}
            mediaContent={
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <Image alt={data?.name} src={data?.imageUrl} />
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
