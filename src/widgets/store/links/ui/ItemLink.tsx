import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import type { StoreLink } from '@/features/stores/types'

export interface ItemLinkProps {
    item: StoreLink
}

export const ItemLink = ({ item }: ItemLinkProps) => {
    return (
        <div className="flex">
            <a
                className={classNames(
                    'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                    'dark:focus-visible:outline-rose-700',
                    'hover:rounded hover:outline-4 hover:outline-offset-4 hover:outline-rose-400 hover:outline-dashed',
                    'dark:hover:outline-rose-600',
                    'hover:rounded-full focus-visible:rounded-full'
                )}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span
                    className={classNames(
                        'inline-flex items-center gap-2 bg-neutral-100 py-2 ps-4 pe-3 text-sm font-medium text-neutral-600',
                        'rounded-full ring-1 ring-neutral-200 ring-inset',
                        'dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700'
                    )}
                >
                    {item.name}
                    <ArrowTopRightOnSquareIcon className="size-4" />
                </span>
            </a>
        </div>
    )
}
