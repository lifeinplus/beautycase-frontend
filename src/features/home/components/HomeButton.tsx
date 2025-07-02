import { Link } from 'react-router-dom'

export interface HomeButtonProps {
    to: string
    label: string
}

export const HomeButton = ({ to, label }: HomeButtonProps) => {
    return (
        <Link to={to} className="btn home-button focus-outline">
            {label}
        </Link>
    )
}
