import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import {
    useGetAllTrainingQuestionnairesQuery,
    useGetMineTrainingQuestionnairesQuery,
} from '@/features/questionnaires/api/questionnairesApi'
import { TrainingQuestionnaireMobileView } from '@/features/questionnaires/training/components/mobile-view/TrainingQuestionnaireMobileView'
import { TrainingQuestionnaireTable } from '@/features/questionnaires/training/components/table/TrainingQuestionnaireTable'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'

export const TrainingQuestionnaireList = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('questionnaire')

    const role = useAppSelector(selectRole)

    const {
        data = [],
        isLoading,
        error,
    } = role === Role.ADMIN
        ? useGetAllTrainingQuestionnairesQuery()
        : useGetMineTrainingQuestionnairesQuery()

    const title = getTitleWithCount(t('headlineList'), data.length)
    const subtitle = t('training.hero.byline')

    const handleBack = () => {
        navigate(ROUTES.questionnaires.root)
    }

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} subtitle={subtitle} hideOnMobile />
                    <div className="md:hidden">
                        <Hero subtitle={subtitle} />
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
