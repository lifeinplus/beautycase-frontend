import { ListBulletIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { ROUTES } from '@/shared/config/routes'
import { TileSection } from '@/widgets/tile-section/TileSection'

export const ControlCenterGallery = () => {
    const { t } = useTranslation('controlCenter')

    const items = [
        {
            label: t('tiles.referenceLists.label'),
            to: ROUTES.controlCenter.referenceLists.root,
            icon: ListBulletIcon,
        },
        {
            label: t('tiles.users.label'),
            to: ROUTES.controlCenter.users,
            icon: UsersIcon,
        },
    ]

    return (
        <article className="pb-13 sm:pb-0">
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full max-w-xs pb-6 md:max-w-md md:pt-6">
                    <Hero title={t('title')} />
                    <TileSection items={items} />
                </article>
            </main>
        </article>
    )
}
