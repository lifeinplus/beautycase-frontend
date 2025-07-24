import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetProductByIdQuery } from '@/features/products/productsApi'
import { ImageSection } from '@/shared/components/common/ImageSection'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { StoreLinks } from '@/widgets/store/store-links/StoreLinks'
import { Details } from '@/widgets/view/details/Details'

export const ProductDetails = () => {
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['product', 'store'])

    const { data, isLoading, error } = useGetProductByIdQuery(id!)

    return (
        <Details
            isLoading={isLoading}
            error={error}
            topPanelTitle={t('titles.details')}
            redirectPath="/products"
            title={data?.name}
            subtitle={data?.brand?.name}
            mediaContent={
                <ImageSection name={data?.name} url={data?.imageUrl} />
            }
            descriptionContent={
                <>
                    {data?.shade && (
                        <section className={pageStyles.description}>
                            <p>{`${t('shade')}: ${data?.shade}`}</p>
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
                <StoreLinks storeLinks={data?.storeLinks} type="product" />
            }
        />
    )
}
