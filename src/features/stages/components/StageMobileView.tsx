import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { formatDate } from '../../../utils'
import { Stage } from '../types'

interface StageMobileViewProps {
    stages?: Stage[]
}

export const StageMobileView = ({ stages }: StageMobileViewProps) => (
    <div className="space-y-5 sm:hidden">
        {stages?.map((item) => (
            <Link
                key={item._id}
                className="flex items-center justify-between pe-5 ps-4"
                to={`/makeup_bags/${item._id}`}
            >
                <div>
                    <p className="text-black dark:text-white">{item.title}</p>
                </div>
                <div className="flex gap-5">
                    <div className="text-center">
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
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
