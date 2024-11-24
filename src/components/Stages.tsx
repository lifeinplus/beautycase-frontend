import Stage from './Stage'

const Stages = ({ stages }: { stages: any[] }) => (
    <section id="stages" className="scroll-mt-20 p-6">
        <h2 className="mb-6 text-center font-heading text-3xl font-bold text-slate-900 sm:text-5xl dark:text-white">
            Этапы
        </h2>
        {stages.map((stage, index) => (
            <Stage key={index} {...stage} />
        ))}
    </section>
)

export default Stages
