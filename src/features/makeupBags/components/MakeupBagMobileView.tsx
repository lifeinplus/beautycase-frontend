import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { MakeupBag } from '../types'

interface MakeupBagMobileViewProps {
    makeupBags?: MakeupBag[]
}

export const MakeupBagMobileView = ({
    makeupBags,
}: MakeupBagMobileViewProps) => (
    <div className="space-y-5 sm:hidden">
        {makeupBags?.map((item) => (
            <Link
                key={item._id}
                className="flex items-center justify-between pe-5 ps-4"
                to={`/makeup_bags/${item._id}`}
            >
                <div>
                    <p className="text-black dark:text-white">
                        {item.clientId.username}
                    </p>
                </div>
                <div className="flex gap-5">
                    <div className="text-center">
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {format(item.createdAt || '', 'yyyy.MM.dd HH:mm')}
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
