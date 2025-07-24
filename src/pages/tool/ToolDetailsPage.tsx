import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetToolByIdQuery } from '@/features/tools/toolsApi'
import { ImageSection } from '@/shared/components/common/ImageSection'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { StoreLinks } from '@/widgets/store/store-links/StoreLinks'
import { Details } from '@/widgets/view/details/Details'

export const ToolDetailsPage = () => {
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['tool', 'store'])

    const { data, isLoading, error } = useGetToolByIdQuery(id!)
    // const [deleteToolById] = useDeleteToolByIdMutation()

    return (
        <Details
            isLoading={isLoading}
            error={error}
            topPanelTitle={t('titles.details')}
            redirectPath="/tools"
            title={data?.name}
            subtitle={data?.brand?.name}
            // deleteItem={deleteToolById}
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
                <StoreLinks storeLinks={data?.storeLinks} type="tool" />
            }
        />
    )
}
