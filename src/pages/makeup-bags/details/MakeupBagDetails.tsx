import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import config from '@/app/config/config'
import { useGetMakeupBagByIdQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagStages } from '@/features/makeup-bags/components/stages/MakeupBagStages'
import { MakeupBagTools } from '@/features/makeup-bags/components/tools/MakeupBagTools'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Footer } from '@/shared/components/layout/footer/Footer'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { Image } from '@/shared/components/ui/image/Image'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { useMakeupBagDetailsActions } from './hooks/useMakeupBagDetailsActions'
import styles from './MakeupBagDetails.module.css'

export const MakeupBagDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation(['makeupBag', 'component', 'stage', 'tool'])

    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)
    const category = data?.category
    const stages = data?.stages || []
    const tools = data?.tools || []

    const actions = useMakeupBagDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = category?.name
        ? t(`categories.${category?.name}.full`)
        : t('titles.details')

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={[...stages, ...tools]}
                        emptyMessage={t('emptyMessage')}
                    >
                        <Hero
                            headline={title}
                            byline={t('hero.byline')}
                            imgUrl={config.cloudinary.makeupBagHero}
                            hideOnMobile
                        />
                        <section className={styles.container}>
                            <h2 className={styles.title}>{t('hero.byline')}</h2>
                            <Image
                                alt={title}
                                className={styles.img}
                                src={config.cloudinary.makeupBagHero}
                            />
                        </section>
                        <MakeupBagStages stages={stages} />
                        <MakeupBagTools tools={tools} />
                    </DataWrapper>
                </article>
            </main>

            {!isLoading && !error && <Footer />}
        </article>
    )
}
