import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useGetAllTrainingQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { TrainingQuestionnaireMobileView } from '@/features/questionnaires/training/components/mobile-view/TrainingQuestionnaireMobileView'
import { TrainingQuestionnaireTable } from '@/features/questionnaires/training/components/table/TrainingQuestionnaireTable'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const TrainingQuestionnaireList = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('questionnaire')

    const {
        data = [],
        isLoading,
        error,
    } = useGetAllTrainingQuestionnairesQuery()

    const title = [t('headlineList'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    const handleBack = () => {
        navigate('/questionnaires')
    }

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={title}
                        byline={t('training.hero.byline')}
                        hideOnMobile
                    />
                    <div className="sm:hidden">
                        <Hero byline={t('training.hero.byline')} />
                    </div>
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TrainingQuestionnaireMobileView data={data} />
                        <TrainingQuestionnaireTable data={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
