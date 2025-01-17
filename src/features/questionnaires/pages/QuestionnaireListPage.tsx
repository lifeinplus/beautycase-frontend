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
                <section className="w-full max-w-2xl space-y-6">
                    <article className="content-container content-container-sm">
                        <Hero headline="Анкеты" />

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={data}
                            emptyMessage="Анкеты не найдены"
                        >
                            <>
                                <QuestionnaireMobileView
                                    questionnaires={data}
                                />
                                <QuestionnaireTable questionnaires={data} />
                            </>
                        </DataWrapper>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
