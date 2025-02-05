import { Link } from 'react-router-dom'

import { Tool } from '../types'

interface ToolCardProps {
    tool: Tool
}

export const ToolCard = ({ tool }: ToolCardProps) => {
    return (
        <div className="img-container img-container-square">
            <Link
                className="relative overflow-hidden"
                to={`/tools/${tool._id}`}
            >
                <img alt={tool.name} className="img" src={tool.imageUrl} />
            </Link>
        </div>
    )
}
