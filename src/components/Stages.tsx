import Stage from './Stage'

const Stages = ({ stages }: { stages: any[] }) => (
    <section id="stages" className="scroll-mt-header sm:scroll-mt-0">
        <h2 className="mb-6 pt-10 text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Этапы
        </h2>
        {stages.map((stage, index) => (
            <Stage key={index} {...stage} />
        ))}
    </section>
)

export default Stages
