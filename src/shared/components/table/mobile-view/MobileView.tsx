import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export interface MobileViewProps<T> {
    items?: T[]
    getTitle: (item: T) => string
    getDescription?: (item: T) => string
    getRightText?: (item: T) => string
    getLink: (item: T) => string
}

export const MobileView = <T,>({
    items,
    getTitle,
    getDescription,
    getRightText,
    getLink,
}: MobileViewProps<T>) => (
    <div className="space-y-5 sm:hidden">
        {items?.map((item) => (
            <Link
                key={getLink(item)}
                className="flex items-center justify-between pe-5 ps-4"
                to={getLink(item)}
            >
                <div>
                    <p className="text-black dark:text-white">
                        {getTitle(item)}
                    </p>
                    {getDescription && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {getDescription(item)}
                        </p>
                    )}
                </div>
                <div className="flex gap-5">
                    <div className="text-center">
                        {getRightText && (
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                {getRightText(item)}
                            </p>
                        )}
                    </div>

                    <div>
                        <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                </div>
            </Link>
        ))}
    </div>
)
