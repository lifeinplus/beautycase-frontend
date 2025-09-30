import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const QuestionnaireGallery = () => {
    const { t } = useTranslation(['questionnaire', 'category'])

    const data = [
        {
            path: '/questionnaire',
            title: t('hero.byline'),
            imageUrl:
                'https://res.cloudinary.com/beautycase/image/upload/v1734995126/Questionnaire_cqv0mc.jpg',
        },
        {
            path: '/training',
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
                            <Link
                                to={`${item.path}`}
                                className="relative block overflow-hidden rounded-xl ring-1 ring-gray-200 dark:ring-gray-700"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="h-32 w-full object-cover lg:h-40"
                                />
                                <div
                                    className={classNames(
                                        'absolute inset-0 bg-gradient-to-tr',
                                        'from-black/40 from-40% via-black/20 via-40% to-transparent to-60%',
                                        'dark:from-black/50 dark:from-40% dark:via-black/30 dark:via-40% dark:to-transparent dark:to-60%'
                                    )}
                                />
                                <div className="absolute bottom-0 px-4 py-3 pr-28 text-white sm:px-5 sm:py-4">
                                    <h2 className="text-pretty font-heading text-base font-semibold sm:text-lg">
                                        {item.title}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </section>
                </article>
            </main>
        </article>
    )
}
