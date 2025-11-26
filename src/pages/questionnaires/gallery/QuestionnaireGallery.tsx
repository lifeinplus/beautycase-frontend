import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import { QuestionnaireCard } from '@/entities/questionnaire/card/QuestionnaireCard'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'

export const QuestionnaireGallery = () => {
    const { t } = useTranslation(['questionnaire', 'category'])

    const data = [
        {
            title: t('makeupBag.hero.byline'),
            imageUrl: config.cloudinary.questionnaireMakeupBag,
            createPath: 'makeup-bag',
            resultsPath: 'makeup-bags',
        },
        {
            title: t('training.hero.byline'),
            imageUrl: config.cloudinary.questionnaireTraining,
            createPath: 'training',
            resultsPath: 'trainings',
        },
    ]

    const title = t('headlineList')

    return (
        <article className="pb-13 md:pb-0">
            <Header />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} />
                    <section className="space-y-10 px-7 md:px-0">
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
