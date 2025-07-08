import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import type { Product } from '@/features/products/types'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { Image } from '@/shared/components/ui/Image'
import pageStyles from '@/shared/components/ui/page.module.css'
import { DetailsPage } from '@/widgets/DetailsPage'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '../../features/stages/stagesApi'

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
                <section className={pageStyles.contentImage}>
                    <div className="img-container img-container-rectangle">
                        <Image alt={data?.title} src={data?.imageUrl} />
                    </div>
                </section>
            }
            descriptionContent={
                <>
                    {data?.comment && (
                        <section className={pageStyles.contentDescription}>
                            <p>{data?.comment}</p>
                        </section>
                    )}
                    {data?.steps?.length ? (
                        <section className={pageStyles.contentDescription}>
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
                <div className={galleryStyles.container}>
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
