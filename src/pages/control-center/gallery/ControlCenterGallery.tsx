import { ListBulletIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { Tile } from '@/shared/components/tile/Tile'

export const ControlCenterGallery = () => {
    const { t } = useTranslation('controlCenter')

    const data = [
        {
            label: t('tiles.referenceLists.label'),
            to: 'reference-lists',
            icon: ListBulletIcon,
        },
        {
            label: t('tiles.users.label'),
            to: 'users',
            icon: UsersIcon,
        },
    ]

    const title = t('title')

    return (
        <article className="pb-13 sm:pb-0">
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} />
                    <section className="mx-auto grid max-w-xs grid-cols-2 gap-x-4 gap-y-3">
                        {data?.map((item, i) => (
                            <Tile
                                key={i}
                                to={item.to}
                                label={item.label}
                                icon={item.icon}
                            />
                        ))}
                    </section>
                </article>
            </main>
        </article>
    )
}
