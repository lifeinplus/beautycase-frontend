import Stage from "./Stage";

const Stages = ({ stages }: { stages: any[] }) => (
    <section id="stages" className="p-6 my-12 scroll-mt-20">
        <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
            Этапы
        </h2>
        {stages.map((stage, index) => (
            <Stage key={index} {...stage} />
        ))}
    </section>
);

export default Stages;
