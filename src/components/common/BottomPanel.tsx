import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export const BottomPanel = () => {
    const navigate = useNavigate()

    return (
        <nav className="bottom-panel">
            <button
                className="bottom-panel__button"
                onClick={() => navigate('/product_gallery/add')}
            >
                <PlusIcon className="h-6 w-6" />
            </button>
        </nav>
    )
}
