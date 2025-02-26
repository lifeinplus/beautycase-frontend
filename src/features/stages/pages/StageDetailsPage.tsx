import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import config from '../../../config'
import { Product } from '../../products'
import { useDeleteStageMutation, useReadStageByIdQuery } from '../../stages'

export const StageDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useReadStageByIdQuery(id!)

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle="Этап"
            redirectPath="/stages"
            title={data?.title}
            subtitle={data?.subtitle}
            description={data?.steps?.reduce((p, c) => p + c, '')}
            deleteMutation={useDeleteStageMutation}
            mediaContent={
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <img
                            alt={data?.title}
                            className="img"
                            src={data?.imageUrl}
                        />
                    </div>
                </section>
            }
            descriptionContent={
                <section className="content-description">
                    {data?.comment && <p>{data?.comment}</p>}
                    {data?.steps?.length ? (
                        <>
                            <p className="my-2 font-bold sm:text-left">Шаги</p>
                            <ul className="ms-5 list-outside list-decimal">
                                {data.steps.map(
                                    (step: string, index: number) => (
                                        <li key={index}>{step}</li>
                                    )
                                )}
                            </ul>
                        </>
                    ) : undefined}
                </section>
            }
            additionalContent={
                <div className="gallery-container">
                    {data?.products?.map((product: Product) => (
                        <div
                            key={product._id}
                            className="img-container img-container-square"
                            onClick={() => handleProduct(product._id)}
                        >
                            <img
                                alt={product.name}
                                className="img"
                                onError={(e) => {
                                    e.currentTarget.alt = 'Default Image'
                                    e.currentTarget.src =
                                        config.cloudinary.defaultThumbnailUrl
                                }}
                                src={product.imageUrl}
                            />
                        </div>
                    ))}
                </div>
            }
        />
    )
}
