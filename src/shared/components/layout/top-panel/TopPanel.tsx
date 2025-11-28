import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { useNavBarActions } from '@/app/layout/hooks/nav-bar-actions/useNavBarActions'
import { MobileActionsDropdown } from './ui/MobileActionsDropdown'
import { MobileSingleActionButton } from './ui/MobileSingleActionButton'

export interface TopPanelProps {
    title: string
}

export const TopPanel = ({ title }: TopPanelProps) => {
    const navigate = useNavigate()

    const navBarActions = useNavBarActions()

    const backAction = navBarActions.find((a) => a.key === 'back')
    const otherActions = navBarActions.filter((a) => a.key !== 'back')

    const handleBack = () => {
        if (backAction) return backAction.onClick()
        return navigate(-1)
    }

    const singleAction = otherActions.length === 1 ? otherActions[0] : null

    return (
        <nav className="pt-safe-top sticky top-0 left-0 z-10 w-full border-b border-neutral-300 bg-white md:hidden dark:border-neutral-700 dark:bg-black">
            <div className="flex items-center justify-between py-2.5 ps-3 pe-0.5">
                <button
                    className="flex items-center pe-0.5 transition-all focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700"
                    onClick={handleBack}
                >
                    <ChevronLeftIcon className="size-7" />
                </button>

                <h2
                    aria-label="Top Panel Title"
                    className="mx-2 flex-grow truncate text-center text-lg font-semibold"
                >
                    {title}
                </h2>

                <div className="flex justify-end">
                    {singleAction ? (
                        <MobileSingleActionButton action={singleAction} />
                    ) : otherActions.length > 1 ? (
                        <MobileActionsDropdown actions={otherActions} />
                    ) : null}
                </div>
            </div>
        </nav>
    )
}
