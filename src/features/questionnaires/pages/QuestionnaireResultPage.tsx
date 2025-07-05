import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { formatDate } from '@/shared/utils/date'
import { QuestionnaireResult } from '../components/QuestionnaireResult'
import { useGetQuestionnaireByIdQuery } from '../questionnairesApi'

export const QuestionnaireResultPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['questionnaire'])

    const { data, isLoading, error } = useGetQuestionnaireByIdQuery(id!)

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const handleBack = () => {
        navigate('/questionnaires')
    }

    return (
        <article>
            <TopPanel title={t('hero.headlineResult')} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero
                            headline={t('hero.headlineResult')}
                            byline={createdAt}
                        />
                    </div>

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
                    className="nav-btn-back"
                />
            </NavBar>
        </article>
    )
}
