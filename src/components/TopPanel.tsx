import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

interface TopPanelProps {
    title: string
    onBack?: () => void
}

export const TopPanel = ({ title, onBack }: TopPanelProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <nav className="panel-top">
            <div className="flex items-center justify-between px-4 py-2.5">
                <button
                    className="panel-top__button"
                    onClick={onBack || handleBack}
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <h1 className="panel-top__title">{title}</h1>
                <div className="w-8"></div>
            </div>
        </nav>
    )
}
