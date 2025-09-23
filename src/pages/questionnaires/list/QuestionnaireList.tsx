import { useTranslation } from 'react-i18next'

import { useGetAllQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { QuestionnaireMobileView } from '@/features/questionnaires/components/mobile-view/QuestionnaireMobileView'
import { QuestionnaireTable } from '@/features/questionnaires/components/table/QuestionnaireTable'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const QuestionnaireList = () => {
    const { t } = useTranslation('questionnaire')

    const { data = [], isLoading, error } = useGetAllQuestionnairesQuery()

    const title = [t('hero.headlineList'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />

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
