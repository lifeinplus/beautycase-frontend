import { Tool } from '../features/api/apiSlice'
import { ToolsList } from '../features/tools/ToolsList'

interface BrandProps {
    name: string
    link: string
    tools?: Tool[]
}

export const Brand = ({ name, link, tools }: BrandProps) => (
    <article className="my-4 bg-gray-100 p-4 dark:bg-gray-900 sm:rounded">
        <h3 className="text-center font-heading text-xl font-bold sm:text-2xl">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-rose-400 decoration-double decoration-2 hover:decoration-wavy"
            >
                {name}
            </a>
        </h3>
        {tools && <ToolsList tools={tools} />}
    </article>
)
