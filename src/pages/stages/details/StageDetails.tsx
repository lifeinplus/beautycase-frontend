import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetStageByIdQuery } from '@/features/stages/api/stagesApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { ImageSection } from '@/shared/components/common/image-section/ImageSection'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { ProductImages } from '@/widgets/product/product-images/ProductImages'
import styles from './StageDetails.module.css'
import { useStageDetailsActions } from './hooks/useStageDetailsActions'

export const StageDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation('stage')

    const { data, isLoading, error } = useGetStageByIdQuery(id!)

    const actions = useStageDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = data?.title || t('titles.details')

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessage')}
                    >
                        <TitleSection
                            title={title}
                            subtitle={data?.subtitle}
                            hideOnMobile
                        />

                        <section className={styles.container}>
                            <h2 className={styles.title}>{data?.subtitle}</h2>
                        </section>

                        <ImageSection name={title} url={data?.imageUrl} />

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

                        <ProductImages products={data?.products} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
