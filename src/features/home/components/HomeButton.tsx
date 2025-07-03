import { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router-dom'

export interface HomeButtonProps {
    to: string
    label: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const HomeButton = ({ to, label, icon: Icon }: HomeButtonProps) => (
    <Link to={to} className="focus-outline home-button group">
        <div className="text-black group-hover:text-white dark:text-white">
            <Icon className="h-16 w-16" />
        </div>
        <span className="home-button-label">{label}</span>
    </Link>
)
