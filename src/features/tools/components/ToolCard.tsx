import { Link } from 'react-router-dom'

import { Tool } from '../types'

interface ToolCardProps {
    tool: Tool
}

export const ToolCard = ({ tool }: ToolCardProps) => {
    return (
        <div className="makeup-item__image-container--square">
            <Link
                className="relative overflow-hidden"
                to={`/tools_gallery/${tool._id}`}
            >
                <img
                    src={tool.image}
                    alt={tool.name}
                    className="makeup-item__image sm:rounded"
                />
            </Link>
        </div>
    )
}
