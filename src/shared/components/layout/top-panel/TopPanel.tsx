import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import type { NavBarAction } from '@/app/layout/hooks/types'
import { MobileActionsDropdown } from './ui/MobileActionsDropdown'

export interface TopPanelProps {
    title: string
    onBack?: () => void
    actions?: NavBarAction[]
}

export const TopPanel = ({ title, onBack, actions }: TopPanelProps) => {
    const navigate = useNavigate()

    const handleBack = () => navigate(-1)

    return (
        <nav className="pt-safe-top sticky top-0 left-0 z-10 w-full border-b border-neutral-300 bg-white md:hidden dark:border-neutral-700 dark:bg-black">
            <div className="flex items-center justify-between py-2.5 ps-4 pe-0.5">
                <button
                    className="me-2 flex items-center pe-0.5 transition-all focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700"
                    onClick={onBack || handleBack}
                >
                    <ChevronLeftIcon className="size-7" />
                </button>

                <h2
                    aria-label="Top Panel Title"
                    className="flex-grow truncate text-center text-lg font-semibold"
                >
                    {title}
                </h2>

                <div className="flex w-8 justify-end">
                    {actions && actions.length > 0 && (
                        <MobileActionsDropdown actions={actions} />
                    )}
                </div>
            </div>
        </nav>
    )
}
