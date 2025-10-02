import { useTranslation } from 'react-i18next'

import { QuestionnaireCard } from '@/entities/questionnaire/card/QuestionnaireCard'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const QuestionnaireGallery = () => {
    const { t } = useTranslation(['questionnaire', 'category'])

    const data = [
        {
            type: 'questionnaire',
            title: t('hero.byline'),
            imageUrl:
                'https://res.cloudinary.com/beautycase/image/upload/v1734995126/Questionnaire_cqv0mc.jpg',
        },
        {
            type: 'training',
            title: t('training.hero.byline'),
            imageUrl:
                'https://thumbs.dreamstime.com/b/online-makeup-tutorials-woman-watches-video-training-herself-as-makeup-artist-laptop-online-makeup-tutorials-woman-227642563.jpg',
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
                        {data?.map((item) => (
                            <QuestionnaireCard
                                key={item.type}
                                type={item.type}
                                imageUrl={item.imageUrl}
                                title={item.title}
                            />
                        ))}
                    </section>
                </article>
            </main>
        </article>
    )
}
