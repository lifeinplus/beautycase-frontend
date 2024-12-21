import { useNavigate } from 'react-router-dom'

import { useScrollToElement } from '../../../hooks'
import type { Tool } from '../types'

interface ToolsListProps {
    tools: Tool[]
}

export const ToolsList = ({ tools }: ToolsListProps) => {
    const { pathname, state, scroll } = useScrollToElement()
    const navigate = useNavigate()

    const handleClick = (id?: string) => {
        navigate(`/tools/${id}`, {
            state: { fromPathname: pathname, fromMakeupBag: true },
        })
    }

    return (
        <ul className="mx-auto mt-6 flex list-none flex-col items-center gap-8 sm:flex-row">
            {tools.map((tool, index) => (
                <li
                    key={index}
                    className="flex w-full flex-col items-center p-2"
                    onClick={() => handleClick(tool._id)}
                    ref={tool._id === state?.scrollId ? scroll : null}
                >
                    <img
                        alt={tool.name}
                        className="mb-6 w-1/2 rounded"
                        src={tool.image}
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
