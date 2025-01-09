import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { DetailsPage, LoadingOrError } from '../../../components'
import { Product } from '../../products'
import { useDeleteStageMutation, useGetStageByIdQuery } from '../stagesApiSlice'

export const StageDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useGetStageByIdQuery(id!)

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Этап не найден" />

    const { title, subtitle, image, steps, productIds } = data

    return (
        <DetailsPage
            topPanelTitle="Этап"
            redirectPath="/stages"
            title={title}
            subtitle={subtitle}
            description={steps.reduce((p, c) => p + c, '')}
            deleteMutation={useDeleteStageMutation}
            mediaContent={
                <section className="page-content__image">
                    <div className="img-container img-container-rectangle">
                        <img alt={title} className="img" src={image} />
                    </div>
                </section>
            }
            descriptionContent={
                <section className="page-content__description">
                    <p className="my-2 font-bold sm:text-left">Шаги</p>
                    <ul className="ms-5 list-outside list-decimal">
                        {steps.map((step: string, index: number) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </section>
            }
            additionalContent={
                <div className="page-gallery__container">
                    {productIds?.map((product: Product) => (
                        <div
                            key={product._id}
                            className="img-container img-container-square"
                            onClick={() => handleProduct(product._id)}
                        >
                            <img
                                alt={product.name}
                                className="img img-sm-rounded"
                                src={product.image}
                            />
                        </div>
                    ))}
                </div>
            }
        />
    )
}
