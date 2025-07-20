import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import config from '@/app/config'
import { useGetMakeupBagByIdQuery } from '@/features/makeupBags/makeupBagsApi'
import { Stages } from '@/features/stages/components/Stages'
import { Tools } from '@/features/tools/components/Tools'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Footer } from '@/shared/components/layout/Footer'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { useMakeupBagDetailsActions } from './hooks/useMakeupBagDetailsActions'

export const MakeupBagDetails = () => {
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['makeupBag', 'component', 'stage', 'tool'])

    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)
    const categoryName = t(`categories.${data?.category?.name}.full`)
    const stages = data?.stages || []
    const tools = data?.tools || []

    const actions = useMakeupBagDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    return (
        <article className={pageStyles.page}>
            <TopPanel
                title={t('titles.details')}
                onBack={backAction?.onClick}
            />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={[...stages, ...tools]}
                        emptyMessage={t('emptyMessage')}
                    >
                        <>
                            <Hero
                                headline={categoryName}
                                byline={t('hero.byline')}
                                imgUrl={config.cloudinary.makeupBagHero}
                            />
                            <Stages stages={stages} />
                            <Tools tools={tools} />
                        </>
                    </DataWrapper>
                </article>
            </main>

            {!isLoading && !error && <Footer />}
        </article>
    )
}
