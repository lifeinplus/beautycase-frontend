import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetTrainingQuestionnaireByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { TrainingData } from '@/features/questionnaires/training/components/data/TrainingData'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { formatDate } from '@/shared/utils/date/formatDate'

export const TrainingResult = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['questionnaire'])

    const { data, isLoading, error } = useGetTrainingQuestionnaireByIdQuery(id!)

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const handleBack = () => {
        navigate('/questionnaires/trainings')
    }

    const title = data?.name || t('hero.headline')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} byline={createdAt} hideOnMobile />
                    <div className="sm:hidden">
                        <Hero byline={createdAt} />
                    </div>
                    <DataWrapper isLoading={isLoading} error={error}>
                        {data && <TrainingData data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
