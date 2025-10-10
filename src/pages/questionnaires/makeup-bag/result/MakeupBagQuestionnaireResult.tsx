import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetMakeupBagQuestionnaireByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { MakeupBagQuestionnaireData } from '@/features/questionnaires/makeup-bag/components/data/MakeupBagQuestionnaireData'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { formatDate } from '@/shared/utils/date/formatDate'

export const MakeupBagQuestionnaireResult = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['questionnaire'])

    const { data, isLoading, error } = useGetMakeupBagQuestionnaireByIdQuery(
        id!
    )

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const handleBack = () => {
        navigate('/questionnaires/makeup-bags')
    }

    const title = data?.name || t('makeupBag.hero.headline')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} byline={createdAt} hideOnMobile />
                    <div className="sm:hidden">
                        <Hero byline={createdAt} />
                    </div>
                    <DataWrapper isLoading={isLoading} error={error}>
                        {data && <MakeupBagQuestionnaireData data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
