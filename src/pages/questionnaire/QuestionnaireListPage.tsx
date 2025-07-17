import { useTranslation } from 'react-i18next'

import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'
import pageStyles from '@/shared/components/ui/page.module.css'
import { QuestionnaireMobileView } from '../../features/questionnaires/components/QuestionnaireMobileView'
import { QuestionnaireTable } from '../../features/questionnaires/components/QuestionnaireTable'
import { useGetAllQuestionnairesQuery } from '../../features/questionnaires/questionnairesApi'

export const QuestionnaireListPage = () => {
    const { t } = useTranslation('questionnaire')
    const { data, isLoading, error } = useGetAllQuestionnairesQuery()

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
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

            <NavBar />
        </article>
    )
}
