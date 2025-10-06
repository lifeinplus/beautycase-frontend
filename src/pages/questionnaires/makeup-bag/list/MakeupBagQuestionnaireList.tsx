import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useGetAllMakeupBagQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { MakeupBagQuestionnaireMobileView } from '@/features/questionnaires/makeup-bag/components/mobile-view/MakeupBagQuestionnaireMobileView'
import { MakeupBagQuestionnaireTable } from '@/features/questionnaires/makeup-bag/components/table/MakeupBagQuestionnaireTable'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const MakeupBagQuestionnaireList = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('questionnaire')

    const {
        data = [],
        isLoading,
        error,
    } = useGetAllMakeupBagQuestionnairesQuery()

    const title = [t('headlineList'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    const handleBack = () => {
        navigate('/questionnaires')
    }

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={title}
                        byline={t('makeupBag.hero.byline')}
                        hideOnMobile
                    />
                    <div className="sm:hidden">
                        <Hero byline={t('makeupBag.hero.byline')} />
                    </div>
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
