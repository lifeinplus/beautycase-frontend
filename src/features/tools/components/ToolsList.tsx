import { Tool } from '../types'

interface ToolsListProps {
    tools: Tool[]
}

export const ToolsList = ({ tools }: ToolsListProps) => {
    return (
        <ul className="mx-auto mt-6 flex list-none flex-col items-center gap-8 sm:flex-row">
            {tools.map((tool, index) => (
                <li
                    key={index}
                    className="flex flex-col items-center p-2 sm:w-5/6"
                >
                    <img
                        src={tool.image}
                        alt={tool.name}
                        className="mb-6 w-1/2 rounded"
                    />
                    <h6 className="text-center font-heading text-sm">
                        {tool.name}
                    </h6>
                    {tool.comment && (
                        <p className="mt-2 text-center text-sm text-slate-500 dark:text-gray-400">
                            {tool.comment}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    )
}
