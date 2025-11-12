import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

export interface TopPanelProps {
    title: string
    onBack?: () => void
}

export const TopPanel = ({ title, onBack }: TopPanelProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <nav className="pt-safe-top sticky top-0 left-0 z-10 w-full border-b border-neutral-300 bg-white md:hidden dark:border-neutral-700 dark:bg-black">
            <div className="flex items-center justify-between px-4 py-2.5">
                <button
                    className={classNames(
                        'me-2 flex items-center pe-0.5 transition-all dark:focus-visible:outline-rose-700',
                        'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed'
                    )}
                    onClick={onBack || handleBack}
                >
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <h2
                    aria-label="Top Panel Title"
                    className="flex-grow truncate text-center text-lg font-semibold"
                >
                    {title}
                </h2>
                <div className="w-8"></div>
            </div>
        </nav>
    )
}
