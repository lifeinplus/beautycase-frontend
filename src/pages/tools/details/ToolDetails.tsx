import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetToolByIdQuery } from '@/features/tools/api/toolsApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { ImageSection } from '@/shared/components/common/image-section/ImageSection'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { StoreLinks } from '@/widgets/store/store-links/StoreLinks'
import styles from './ToolDetails.module.css'
import { useToolDetailsActions } from './hooks/useToolDetailsActions'

export const ToolDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation(['tool', 'store'])

    const { data, isLoading, error } = useGetToolByIdQuery(id!)

    const actions = useToolDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = data?.brand?.name || t('titles.details')

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
                            subtitle={data?.name}
                            hideOnMobile
                        />

                        <section className={styles.container}>
                            <h2 className={styles.title}>{data?.name}</h2>
                        </section>

                        <ImageSection name={data?.name} url={data?.imageUrl} />

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

                        <StoreLinks storeLinks={data?.storeLinks} type="tool" />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
