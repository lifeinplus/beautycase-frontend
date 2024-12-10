import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

interface TopPanelProps {
    title: string
    onBack?: () => void
}

export const TopPanel = ({ title, onBack }: TopPanelProps) => {
    const navigate = useNavigate()

    return (
        <nav className="panel-top">
            <button
                className="panel-top__button"
                onClick={onBack || (() => navigate(-1))}
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="panel-top__title">{title}</h1>
            <div className="w-8"></div>
        </nav>
    )
}
