import { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router-dom'

export interface HomeTileProps {
    to: string
    label: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const HomeTile = ({ to, label, icon: Icon }: HomeTileProps) => (
    <Link to={to} className="focus-outline home-tile group">
        <div className="text-black group-hover:text-white dark:text-white">
            <Icon className="h-16 w-16" />
        </div>
        <span className="home-tile-label">{label}</span>
    </Link>
)
