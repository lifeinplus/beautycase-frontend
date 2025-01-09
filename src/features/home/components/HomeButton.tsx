import { Link } from 'react-router-dom'

interface HomeButtonProps {
    to: string
    label: string
}

export const HomeButton = ({ to, label }: HomeButtonProps) => {
    return (
        <Link to={to} className="home-button">
            {label}
        </Link>
    )
}
