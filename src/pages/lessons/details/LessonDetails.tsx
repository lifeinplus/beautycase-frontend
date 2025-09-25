import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetLessonByIdQuery } from '@/features/lessons/api/lessonsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { VideoSection } from '@/shared/components/common/video-section/VideoSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { ProductImages } from '@/widgets/product/product-images/ProductImages'
import styles from './LessonDetails.module.css'
import { useLessonDetailsActions } from './hooks/useLessonDetailsActions'

export const LessonDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation('lesson')

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)

    const actions = useLessonDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = data?.title || t('titles.details')

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={data?.title}
                            subtitle={data?.shortDescription}
                            hideOnMobile
                        />

                        <section className={styles.container}>
                            <h2 className={styles.title}>
                                {data?.shortDescription}
                            </h2>
                        </section>

                        <VideoSection name={data?.title} url={data?.videoUrl} />

                        <section className={pageStyles.description}>
                            <p>{data?.fullDescription}</p>
                        </section>

                        <ProductImages products={data?.products} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
