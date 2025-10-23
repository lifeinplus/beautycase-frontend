import {
    FilmIcon,
    PaintBrushIcon,
    QueueListIcon,
    RectangleGroupIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { TileSection } from '@/widgets/tile-section/TileSection'

export const BackstageGallery = () => {
    const { t } = useTranslation('backstage')

    const items = [
        {
            label: t('tiles.makeupBags'),
            to: 'makeup-bags',
            icon: ShoppingBagIcon,
        },
        {
            label: t('tiles.stages'),
            to: 'stages',
            icon: QueueListIcon,
        },
        {
            label: t('tiles.products'),
            to: 'products',
            icon: RectangleGroupIcon,
        },
        {
            label: t('tiles.tools'),
            to: 'tools',
            icon: PaintBrushIcon,
        },
        {
            label: t('tiles.lessons'),
            to: 'lessons',
            icon: FilmIcon,
        },
    ]

    return (
        <article className="pb-13 md:pb-0">
            <Header />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full max-w-xs pb-6 md:max-w-md md:pt-6">
                    <Hero title={t('title')} />
                    <TileSection items={items} />
                </article>
            </main>
        </article>
    )
}
