import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetProductByIdQuery } from '@/features/products/api/productsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { ImageSection } from '@/shared/components/common/image-section/ImageSection'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { StoreLinks } from '@/widgets/store/store-links/StoreLinks'
import styles from './ProductDetails.module.css'
import { useProductDetailsActions } from './hooks/useProductDetailsActions'

export const ProductDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation(['product', 'store'])

    const { data, isLoading, error } = useGetProductByIdQuery(id!)

    const actions = useProductDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = data?.brand?.name || t('titles.details')

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={title}
                            subtitle={data?.name}
                            hideOnMobile
                        />

                        <section className={styles.container}>
                            <h2 className={styles.title}>{data?.name}</h2>
                        </section>

                        <ImageSection name={data?.name} url={data?.imageUrl} />

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

                        <StoreLinks
                            storeLinks={data?.storeLinks}
                            type="product"
                        />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
