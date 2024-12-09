import { useGetStagesQuery } from '../features/api/apiSlice'
import { Stage } from './Stage'

export const Stages = () => {
    const { data: stages } = useGetStagesQuery()

    return (
        <section id="stages" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Этапы
            </h2>

            {stages?.map((stage, index) => (
                <Stage
                    key={index}
                    title={stage.title}
                    subtitle={stage.subtitle}
                    image={stage.image}
                    steps={stage.steps}
                    products={stage.productIds}
                />
            ))}
        </section>
    )
}
