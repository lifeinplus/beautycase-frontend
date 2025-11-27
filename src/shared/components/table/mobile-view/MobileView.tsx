import { ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
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
    <div className="space-y-5 md:hidden">
        {items?.map((item) => (
            <Link
                key={getLink(item)}
                className={classNames(
                    'flex items-center justify-between ps-4 pe-5 transition-all',
                    'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed'
                )}
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
                        <ChevronRightIcon className="size-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                </div>
            </Link>
        ))}
    </div>
)
