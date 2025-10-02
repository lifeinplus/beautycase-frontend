import { useTranslation } from 'react-i18next'

import { useGetAllTrainingsQuery } from '@/features/questionnaires/api/questionnairesApi'
import { TrainingMobileView } from '@/features/questionnaires/components/training/mobile-view/TrainingMobileView'
import { TrainingTable } from '@/features/questionnaires/components/training/table/TrainingTable'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const TrainingList = () => {
    const { t } = useTranslation('questionnaire')

    const { data = [], isLoading, error } = useGetAllTrainingsQuery()

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
                        <TrainingMobileView data={data} />
                        <TrainingTable data={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
