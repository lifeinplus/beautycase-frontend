import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import type { Tool } from '@/features/tools/types'
import { GoodsGrid } from '@/shared/components/gallery/goods-grid/GoodsGrid'
import { ROUTES } from '@/shared/config/routes'

export interface MakeupBagToolsProps {
    tools?: Tool[]
}

export const MakeupBagTools = ({ tools }: MakeupBagToolsProps) => {
    const { t } = useTranslation('tool')

    return (
        <section id="tools" className="scroll-mt-header md:scroll-mt-0">
            <h2 className="font-heading my-10 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
                {t('titles.list')}
            </h2>

            {tools && (
                <GoodsGrid
                    goods={tools}
                    basePath={ROUTES.tools.root}
                    defaultImageId={config.cloudinary.defaultToolId}
                />
            )}
        </section>
    )
}
