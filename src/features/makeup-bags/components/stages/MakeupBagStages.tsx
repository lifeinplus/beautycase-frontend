import { useTranslation } from 'react-i18next'

import { ImageSection } from '@/shared/components/forms/image-section/ImageSection'
import { GoodsGrid } from '@/shared/components/gallery/goods-grid/GoodsGrid'
import { ROUTES } from '@/shared/config/routes'
import type { Stage } from '../../../stages/types'

export interface MakeupBagStagesProps {
    stages?: Stage[]
}

export const MakeupBagStages = ({ stages }: MakeupBagStagesProps) => {
    const { t } = useTranslation('stage')

    return (
        <section id="stages" className="scroll-mt-header sm:scroll-mt-0">
            {stages?.map((stage, index) => (
                <article key={index} className="my-4 space-y-8 py-4">
                    <div>
                        <h3 className="font-heading text-center text-xl font-bold sm:text-xl md:text-3xl lg:text-4xl">
                            {stage.title}
                        </h3>
                        <h4 className="font-heading mt-2 mb-6 text-center text-lg text-slate-700 sm:text-lg md:text-xl lg:text-2xl dark:text-slate-400">
                            {stage.subtitle}
                        </h4>
                    </div>

                    <ImageSection name={stage?.title} url={stage?.imageUrl} />

                    <section className="px-4">
                        <p className="my-2 font-bold sm:text-left">
                            {t('steps')}
                        </p>
                        <ul className="ms-5 list-outside list-decimal">
                            {stage.steps?.map((step: string, index: number) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </section>

                    {stage.products && (
                        <GoodsGrid
                            basePath={ROUTES.products.root}
                            goods={stage.products}
                        />
                    )}
                </article>
            ))}
        </section>
    )
}
