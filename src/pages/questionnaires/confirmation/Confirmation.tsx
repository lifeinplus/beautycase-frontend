import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'

export const Confirmation = () => {
    const { t } = useTranslation('confirmation')

    return (
        <article>
            <Header />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />
                </article>
            </main>
        </article>
    )
}
