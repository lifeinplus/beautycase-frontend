import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetTrainingQuestionnaireByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { TrainingQuestionnaireData } from '@/features/questionnaires/training/components/data/TrainingQuestionnaireData'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ROUTES } from '@/shared/config/routes'
import { formatDate } from '@/shared/utils/date/formatDate'

export const TrainingQuestionnaireResult = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['questionnaire'])

    const { data, isLoading, error } = useGetTrainingQuestionnaireByIdQuery(id!)

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const handleBack = () => {
        navigate(ROUTES.questionnaires.trainings.root)
    }

    const title = data?.name || t('training.hero.headline')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} subtitle={createdAt} hideOnMobile />
                    <div className="md:hidden">
                        <Hero subtitle={createdAt} />
                    </div>
                    <DataWrapper isLoading={isLoading} error={error}>
                        {data && <TrainingQuestionnaireData data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
