import { DataWrapper } from '../../../components/DataWrapper'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { QuestionnaireMobileView } from '../components/QuestionnaireMobileView'
import { QuestionnaireTable } from '../components/QuestionnaireTable'
import { useGetQuestionnairesQuery } from '../questionnaireApiSlice'

export const QuestionnaireListPage = () => {
    const { data, isLoading, error } = useGetQuestionnairesQuery()

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero headline="Анкеты" />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Анкеты не найдены"
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
