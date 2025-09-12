import { useTranslation } from 'react-i18next'

import { ImageSection } from '@/shared/components/common/image-section/ImageSection'
import { GoodsGrid } from '@/shared/components/gallery/goods-grid/GoodsGrid'
import type { Stage } from '../../types'
import style from './Stages.module.css'

export interface StagesProps {
    stages?: Stage[]
}

export const Stages = ({ stages }: StagesProps) => {
    const { t } = useTranslation('stage')

    return (
        <section id="stages" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
                {t('titles.list')}
            </h2>

            {stages?.map((stage, index) => (
                <article
                    key={index}
                    className="my-4 bg-gray-100 py-4 dark:bg-gray-900 sm:rounded"
                >
                    <h3 className={style.title}>{stage.title}</h3>
                    <h4 className={style.subtitle}>{stage.subtitle}</h4>

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
