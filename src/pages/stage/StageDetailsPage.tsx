import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { ImageSection } from '@/shared/components/common/ImageSection'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { DetailsPage } from '@/widgets/DetailsPage'
import { ProductImages } from '@/widgets/product/ProductImages'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '../../features/stages/stagesApi'

export const StageDetailsPage = () => {
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('stage')

    const { data, isLoading, error } = useGetStageByIdQuery(id!)
    const [deleteStageById] = useDeleteStageByIdMutation()
    const [duplicateStageById] = useDuplicateStageByIdMutation()

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle={t('titles.details')}
            redirectPath="/stages"
            title={data?.title}
            subtitle={data?.subtitle}
            description={data?.steps?.reduce((p, c) => p + c, '')}
            deleteItem={deleteStageById}
            duplicateItem={duplicateStageById}
            showDuplicate={true}
            mediaContent={
                <ImageSection name={data?.title} url={data?.imageUrl} />
            }
            descriptionContent={
                <>
                    {data?.comment && (
                        <section className={pageStyles.description}>
                            <p>{data?.comment}</p>
                        </section>
                    )}
                    {data?.steps?.length ? (
                        <section className={pageStyles.description}>
                            <p className="my-2 font-bold sm:text-left">
                                {t('steps')}
                            </p>
                            <ul className="ms-5 list-outside list-decimal">
                                {data.steps.map(
                                    (step: string, index: number) => (
                                        <li key={index}>{step}</li>
                                    )
                                )}
                            </ul>
                        </section>
                    ) : undefined}
                </>
            }
            additionalContent={<ProductImages products={data?.products} />}
        />
    )
}
