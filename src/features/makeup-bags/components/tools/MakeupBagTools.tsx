import { useTranslation } from 'react-i18next'

import type { Tool } from '@/features/tools/types'
import { GoodsGrid } from '@/shared/components/gallery/goods-grid/GoodsGrid'

export interface MakeupBagToolsProps {
    tools?: Tool[]
}

export const MakeupBagTools = ({ tools }: MakeupBagToolsProps) => {
    const { t } = useTranslation('tool')

    return (
        <section id="tools" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="my-10 text-center font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
                {t('titles.list')}
            </h2>

            {tools && <GoodsGrid basePath="/tools" goods={tools} />}
        </section>
    )
}
