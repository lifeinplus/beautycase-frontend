import { useTranslation } from 'react-i18next'

import { ImageSection } from '@/shared/components/common/image-section/ImageSection'
import { GoodsGrid } from '@/shared/components/gallery/goods-grid/GoodsGrid'
import type { Stage } from '../../../stages/types'
import styles from './MakeupBagStages.module.css'

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
                        <h3 className={styles.title}>{stage.title}</h3>
                        <h4 className={styles.subtitle}>{stage.subtitle}</h4>
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
                            basePath="/products"
                            goods={stage.products}
                        />
                    )}
                </article>
            ))}
        </section>
    )
}
