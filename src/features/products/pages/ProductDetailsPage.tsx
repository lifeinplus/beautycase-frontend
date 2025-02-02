import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import config from '../../../config'
import { cloudinary } from '../../../utils'
import {
    Product,
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../../products'
import { ReactNode } from 'react'

const renderMediaContent = (data?: Product) => {
    if (!data) return

    const { imageData, imageUrl, name } = data

    let content: ReactNode

    if (imageData?.url || imageUrl) {
        const url = imageData?.url || imageUrl
        content = <img alt={name} className="img" src={url} />
    } else if (imageData?.id && imageData?.version) {
        const cldImg = cloudinary
            .image(imageData?.id)
            .setVersion(imageData?.version)
            .resize(scale().width(800))
            .format('auto')
            .quality('auto')

        content = <AdvancedImage className="img" cldImg={cldImg} />
    } else {
        const cldImg = cloudinary
            .image(config.cloudinary.defaultThumbnailName)
            .resize(scale().width(800))
            .format('auto')
            .quality('auto')

        content = <AdvancedImage className="img" cldImg={cldImg} />
    }

    return (
        <section className="content-image">
            <div className="img-container img-container-rectangle">
                {content}
            </div>
        </section>
    )
}

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
            mediaContent={renderMediaContent(data)}
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
