import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import config from '@/app/config/config'
import { useGetMakeupBagByIdQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagStages } from '@/features/makeup-bags/components/stages/MakeupBagStages'
import { MakeupBagTools } from '@/features/makeup-bags/components/tools/MakeupBagTools'
import { Hero } from '@/shared/components/hero/Hero'
import { Footer } from '@/shared/components/layout/footer/Footer'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { Image } from '@/shared/components/ui/image/Image'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export interface MakeupBagDetailsProps {
    onBack: () => void
}

export const MakeupBagDetails = ({ onBack }: MakeupBagDetailsProps) => {
    const { id } = useParams()
    const { t } = useTranslation(['makeupBag', 'component', 'stage', 'tool'])

    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)
    const category = data?.category
    const stages = data?.stages || []
    const tools = data?.tools || []

    const title = category?.name
        ? t(`categories.${category?.name}.full`)
        : t('titles.details')

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} onBack={onBack} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <Hero
                            title={title}
                            subtitle={t('hero.byline')}
                            imgUrl={config.cloudinary.makeupBagHero}
                            hideOnMobile
                        />
                        <section className="mt-5 md:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {t('hero.byline')}
                            </h2>
                            <Image
                                alt={title}
                                className="mt-6"
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
