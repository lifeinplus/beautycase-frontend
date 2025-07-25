import { useTranslation } from 'react-i18next'

import { QuestionnaireMobileView } from '@/features/questionnaires/components/QuestionnaireMobileView'
import { QuestionnaireTable } from '@/features/questionnaires/components/QuestionnaireTable'
import { useGetAllQuestionnairesQuery } from '@/features/questionnaires/questionnairesApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import pageStyles from '@/shared/components/ui/page.module.css'

export const QuestionnaireList = () => {
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
        </article>
    )
}
