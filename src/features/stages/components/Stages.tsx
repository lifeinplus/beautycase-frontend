import { ProductsList } from '../../products'
import { Stage } from '../stagesApiSlice'

interface StagesProps {
    stages?: Stage[]
}

export const Stages = ({ stages }: StagesProps) => {
    return (
        <section id="stages" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
                Этапы
            </h2>

            {stages?.map((stage, index) => (
                <article
                    key={index}
                    className="my-4 bg-gray-100 p-4 dark:bg-gray-900 sm:rounded"
                >
                    <h3 className="stage-headline">{stage.title}</h3>
                    <h4 className="stage-byline">{stage.subtitle}</h4>

                    <img
                        src={stage.image}
                        alt={stage.title}
                        className="mx-auto my-4 w-full max-w-lg rounded-md"
                    />

                    <p className="my-2 font-bold sm:text-left">Шаги</p>
                    <ul className="ms-5 list-outside list-decimal">
                        {stage.steps.map((step: string, index: number) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>

                    {stage.productIds && (
                        <ProductsList products={stage.productIds} />
                    )}
                </article>
            ))}
        </section>
    )
}
