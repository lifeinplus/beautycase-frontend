import { GoodsGrid } from '../../../components'
import { type Tool } from '../../tools'

interface ToolsProps {
    tools?: Tool[]
}

export const Tools = ({ tools }: ToolsProps) => (
    <section id="tools" className="scroll-mt-header sm:scroll-mt-0">
        <h2 className="mb-6 pt-10 text-center font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
            Инструменты
        </h2>

        {tools && <GoodsGrid basePath="/tools" goods={tools} />}
    </section>
)
