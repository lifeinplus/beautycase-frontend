import { useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../../tools'

export const ToolDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useGetToolByIdQuery(id!)

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle="Инструмент"
            redirectPath="/tools"
            title={data?.name}
            subtitle={data?.brandId.name}
            description={data?.number}
            deleteMutation={useDeleteToolMutation}
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
            additionalContent={
                data?.comment && (
                    <section className="page-content__description">
                        <p>{data?.comment}</p>
                    </section>
                )
            }
        />
    )
}
