import { useTranslation } from 'react-i18next'

import { Image } from '../../../components/ui/Image'
import { GoodsGrid } from '../../../components/GoodsGrid'
import type { Stage } from '../types'

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
                    <h3 className="stage-headline">{stage.title}</h3>
                    <h4 className="stage-byline">{stage.subtitle}</h4>

                    <section className="content-image">
                        <div className="img-container img-container-rectangle">
                            <Image alt={stage.title} src={stage.imageUrl} />
                        </div>
                    </section>

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
