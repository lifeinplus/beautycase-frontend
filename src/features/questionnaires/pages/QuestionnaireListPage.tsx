import { AdaptiveNavBar, DataWrapper, Header, Hero } from '../../../components'
import {
    QuestionnaireMobileView,
    QuestionnaireTable,
    useGetQuestionnairesQuery,
} from '../../questionnaires'

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
