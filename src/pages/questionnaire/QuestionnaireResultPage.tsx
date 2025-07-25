import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { QuestionnaireResult } from '@/features/questionnaires/components/QuestionnaireResult'
import { useGetQuestionnaireByIdQuery } from '@/features/questionnaires/questionnairesApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { formatDate } from '@/shared/utils/date'

export const QuestionnaireResultPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['questionnaire'])

    const { data, isLoading, error } = useGetQuestionnaireByIdQuery(id!)

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const handleBack = () => {
        navigate('/questionnaires')
    }

    return (
        <article>
            <TopPanel title={t('hero.headlineResult')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={t('hero.headlineResult')}
                        byline={createdAt}
                        hideOnMobile
                    />

                    <div className="sm:hidden">
                        <Hero byline={createdAt} />
                    </div>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessage')}
                    >
                        {data && <QuestionnaireResult data={data} />}
                    </DataWrapper>
                </article>
            </main>

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className={navStyles.navBtnBack}
                />
            </NavBar>
        </article>
    )
}
