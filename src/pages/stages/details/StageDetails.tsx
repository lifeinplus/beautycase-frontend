import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetStageByIdQuery } from '@/features/stages/api/stagesApi'
import { ImageSection } from '@/shared/components/common/image-section/ImageSection'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { ProductImages } from '@/widgets/product/product-images/ProductImages'
import { Details } from '@/widgets/view/details/Details'

export const StageDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation('stage')

    const { data, isLoading, error } = useGetStageByIdQuery(id!)

    return (
        <Details
            isLoading={isLoading}
            error={error}
            topPanelTitle={t('titles.details')}
            redirectPath="/stages"
            title={data?.title}
            subtitle={data?.subtitle}
            description={data?.steps?.reduce((p, c) => p + c, '')}
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
