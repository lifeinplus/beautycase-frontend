import { useTranslation } from 'react-i18next'

import { GoodsGrid } from '@/shared/components/gallery/goods-grid/GoodsGrid'
import type { Tool } from '../../types'

export interface ToolsProps {
    tools?: Tool[]
}

export const Tools = ({ tools }: ToolsProps) => {
    const { t } = useTranslation('tool')

    return (
        <section id="tools" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
                {t('titles.list')}
            </h2>

            {tools && <GoodsGrid basePath="/tools" goods={tools} />}
        </section>
    )
}
