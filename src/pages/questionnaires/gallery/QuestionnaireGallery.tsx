import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import { QuestionnaireCard } from '@/entities/questionnaire/card/QuestionnaireCard'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const QuestionnaireGallery = () => {
    const { t } = useTranslation(['questionnaire', 'category'])

    const data = [
        {
            title: t('hero.byline'),
            imageUrl: config.cloudinary.questionnaireMakeupBagHero,
            createPath: 'makeup-bag',
            resultsPath: 'makeup-bags',
        },
        {
            title: t('training.hero.byline'),
            imageUrl: config.cloudinary.questionnaireTrainingHero,
            createPath: 'training',
            resultsPath: 'trainings',
        },
    ]

    const title = t('hero.headlineList')

    return (
        <article className={pageStyles.page}>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />
                    <section className="space-y-8 px-7 sm:px-0">
                        {data?.map((item, i) => (
                            <QuestionnaireCard
                                key={i}
                                title={item.title}
                                imageUrl={item.imageUrl}
                                createPath={item.createPath}
                                resultsPath={item.resultsPath}
                            />
                        ))}
                    </section>
                </article>
            </main>
        </article>
    )
}
