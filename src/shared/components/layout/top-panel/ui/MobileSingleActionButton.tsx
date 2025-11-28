import type { NavBarAction } from '@/app/layout/hooks/types'

export interface MobileSingleActionButtonProps {
    action: NavBarAction
}

export const MobileSingleActionButton = ({
    action,
}: MobileSingleActionButtonProps) => {
    const { onClick, icon: Icon } = action

    return (
        <button
            onClick={onClick}
            className="me-2.5 flex items-center text-black transition-all focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:text-white dark:focus-visible:outline-rose-700"
        >
            <Icon className="size-7" />
        </button>
    )
}
