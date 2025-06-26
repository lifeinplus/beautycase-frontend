import { useTranslation } from 'react-i18next'

import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { DataWrapper } from '../../../components/DataWrapper'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { QuestionnaireMobileView } from '../components/QuestionnaireMobileView'
import { QuestionnaireTable } from '../components/QuestionnaireTable'
import { useGetAllQuestionnairesQuery } from '../questionnairesApi'

export const QuestionnaireListPage = () => {
    const { t } = useTranslation('questionnaire')
    const { data, isLoading, error } = useGetAllQuestionnairesQuery()

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline={t('hero.headlineList')} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('hero.emptyMessageList')}
                    >
                        <>
                            <QuestionnaireMobileView questionnaires={data} />
                            <QuestionnaireTable questionnaires={data} />
                        </>
                    </DataWrapper>
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
