import { useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../../tools'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

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
            deleteMutation={useDeleteToolMutation}
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
            descriptionContent={
                <section className="content-description">
                    {data?.number && <p>{`Номер: ${data?.number}`}</p>}
                    {data?.comment && <p>{data?.comment}</p>}
                </section>
            }
            additionalContent={
                <section className="content-description">
                    {data?.storeLinks?.length !== 0 && (
                        <>
                            <p className="my-3 font-bold">Ссылки на товар</p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                {data?.storeLinks?.map((l, i) => (
                                    <a key={i} href={l.link} target="_blank">
                                        <span className="store-link">
                                            {l.name}
                                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            }
        />
    )
}
