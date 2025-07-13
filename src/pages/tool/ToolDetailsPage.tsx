import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { ImageSection } from '@/shared/components/common/ImageSection'
import pageStyles from '@/shared/components/ui/page.module.css'
import storeStyles from '@/shared/components/ui/store-link.module.css'
import type { RouteId } from '@/shared/types/router'
import { DetailsPage } from '@/widgets/DetailsPage'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '../../features/tools/toolsApi'

export const ToolDetailsPage = () => {
    const { id } = useParams<RouteId>()
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
                <ImageSection name={data?.name} url={data?.imageUrl} />
            }
            descriptionContent={
                <>
                    {data?.number && (
                        <section className={pageStyles.description}>
                            <p>{`${t('number')}: ${data?.number}`}</p>
                        </section>
                    )}
                    {data?.comment && (
                        <section className={pageStyles.description}>
                            <p>{data?.comment}</p>
                        </section>
                    )}
                </>
            }
            additionalContent={
                data?.storeLinks?.length !== 0 && (
                    <section className={pageStyles.description}>
                        <p className="mb-3 font-bold">{t('links')}</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            {data?.storeLinks?.map((l, i) => (
                                <a
                                    key={i}
                                    href={l.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className={storeStyles.storeLink}>
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
