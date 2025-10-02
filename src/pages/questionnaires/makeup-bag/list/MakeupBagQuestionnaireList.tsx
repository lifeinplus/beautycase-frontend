import { useTranslation } from 'react-i18next'

import { useGetAllMakeupBagQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { MakeupBagQuestionnaireMobileView } from '@/features/questionnaires/makeup-bag/components/mobile-view/MakeupBagQuestionnaireMobileView'
import { MakeupBagQuestionnaireTable } from '@/features/questionnaires/makeup-bag/components/table/MakeupBagQuestionnaireTable'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const MakeupBagQuestionnaireList = () => {
    const { t } = useTranslation('questionnaire')

    const {
        data = [],
        isLoading,
        error,
    } = useGetAllMakeupBagQuestionnairesQuery()

    const title = [t('hero.headlineList'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <MakeupBagQuestionnaireMobileView
                            questionnaires={data}
                        />
                        <MakeupBagQuestionnaireTable questionnaires={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
