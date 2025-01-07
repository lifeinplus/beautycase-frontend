import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

interface GenericMobileViewProps<T> {
    items?: T[]
    getTitle: (item: T) => string
    getSubtitle?: (item: T) => string
    getDate: (item: T) => string
    getLink: (item: T) => string
}

export const GenericMobileView = <T,>({
    items,
    getTitle,
    getSubtitle,
    getDate,
    getLink,
}: GenericMobileViewProps<T>) => (
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
                    {getSubtitle && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {getSubtitle(item)}
                        </p>
                    )}
                </div>
                <div className="flex gap-5">
                    <div className="text-center">
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {getDate(item)}
                        </p>
                    </div>

                    <div>
                        <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                </div>
            </Link>
        ))}
    </div>
)
