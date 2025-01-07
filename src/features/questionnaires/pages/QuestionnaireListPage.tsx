import { AdaptiveNavBar, DataWrapper, Header, Hero } from '../../../components'
import {
    QuestionnaireMobileView,
    QuestionnaireTable,
    useGetQuestionnairesQuery,
} from '../../questionnaires'

export const QuestionnaireListPage = () => {
    const {
        data: questionnaires,
        isLoading,
        error,
    } = useGetQuestionnairesQuery()

    return (
        <article>
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-sm">
                        <Hero headline="Анкеты" />

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={questionnaires}
                            emptyMessage="Анкеты не найдены"
                        >
                            <>
                                <QuestionnaireMobileView
                                    questionnaires={questionnaires}
                                />
                                <QuestionnaireTable
                                    questionnaires={questionnaires}
                                />
                            </>
                        </DataWrapper>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
