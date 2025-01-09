import { useParams } from 'react-router-dom'

import { DetailsPage, LoadingOrError } from '../../../components'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../toolsApiSlice'

export const ToolDetailsPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useGetToolByIdQuery(id!)

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Инструмент не найден" />

    const { brandId, name, image, number, comment } = data

    return (
        <DetailsPage
            topPanelTitle="Инструмент"
            redirectPath="/tools"
            title={name}
            subtitle={brandId.name}
            description={number}
            deleteMutation={useDeleteToolMutation}
            mediaContent={
                <section className="page-content__image">
                    <div className="img-container img-container-rectangle">
                        <img src={image} alt={name} className="img" />
                    </div>
                </section>
            }
            additionalContent={
                comment && (
                    <section className="page-content__description">
                        <p>{comment}</p>
                    </section>
                )
            }
        />
    )
}
