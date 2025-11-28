import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetMakeupBagQuestionnaireByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { MakeupBagQuestionnaireData } from '@/features/questionnaires/makeup-bag/components/data/MakeupBagQuestionnaireData'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { formatDate } from '@/shared/utils/date/formatDate'

export const MakeupBagQuestionnaireResult = () => {
    const { id } = useParams()
    const { t } = useTranslation(['questionnaire'])

    const { data, isLoading, error } = useGetMakeupBagQuestionnaireByIdQuery(
        id!
    )

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const title = data?.name || t('makeupBag.hero.headline')

    return (
        <article>
            <TopPanel title={title} />
            {/* TODO: change pb-6 to md:pb-6 ??? */}
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} subtitle={createdAt} hideOnMobile />
                    <div className="md:hidden">
                        <Hero subtitle={createdAt} />
                    </div>
                    <DataWrapper isLoading={isLoading} error={error}>
                        {data && <MakeupBagQuestionnaireData data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
