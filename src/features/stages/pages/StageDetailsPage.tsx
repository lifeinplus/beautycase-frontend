import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { DetailsPage } from '../../../app/routes/DetailsPage'
import { Image } from '../../../shared/components/ui/Image'
import type { Product } from '../../products/types'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '../stagesApi'

export const StageDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('stage')

    const { data, isLoading, error } = useGetStageByIdQuery(id!)
    const [deleteStageById] = useDeleteStageByIdMutation()
    const [duplicateStageById] = useDuplicateStageByIdMutation()

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

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
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <Image alt={data?.title} src={data?.imageUrl} />
                    </div>
                </section>
            }
            descriptionContent={
                <>
                    {data?.comment && (
                        <section className="content-description">
                            <p>{data?.comment}</p>
                        </section>
                    )}
                    {data?.steps?.length ? (
                        <section className="content-description">
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
            additionalContent={
                <div className="gallery-container">
                    {data?.products?.map((product: Product) => (
                        <div
                            key={product._id}
                            className="img-container img-container-square"
                            onClick={() => handleProduct(product._id)}
                        >
                            <Image alt={product.name} src={product.imageUrl} />
                        </div>
                    ))}
                </div>
            }
        />
    )
}
