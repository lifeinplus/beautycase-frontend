import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { DetailsPage } from '@/app/routes/DetailsPage'
import { Image } from '@/shared/components/ui/Image'
import { useDeleteToolByIdMutation, useGetToolByIdQuery } from '../toolsApi'

export const ToolDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('tool')

    const { data, isLoading, error } = useGetToolByIdQuery(id!)
    const [deleteToolById] = useDeleteToolByIdMutation()

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle={t('titles.details')}
            redirectPath="/tools"
            title={data?.name}
            subtitle={data?.brand?.name}
            deleteItem={deleteToolById}
            mediaContent={
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <Image alt={data?.name} src={data?.imageUrl} />
                    </div>
                </section>
            }
            descriptionContent={
                <>
                    {data?.number && (
                        <section className="content-description">
                            <p>{`${t('number')}: ${data?.number}`}</p>
                        </section>
                    )}
                    {data?.comment && (
                        <section className="content-description">
                            <p>{data?.comment}</p>
                        </section>
                    )}
                </>
            }
            additionalContent={
                data?.storeLinks?.length !== 0 && (
                    <section className="content-description">
                        <p className="mb-3 font-bold">{t('links')}</p>
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
