import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { formatDate } from '../../../utils'
import { Questionnaire } from '../types'

interface QuestionnaireMobileViewProps {
    questionnaires?: Questionnaire[]
}

export const QuestionnaireMobileView = ({
    questionnaires,
}: QuestionnaireMobileViewProps) => (
    <div className="space-y-5 sm:hidden">
        {questionnaires?.map((item) => (
            <Link
                key={item._id}
                className="flex items-center justify-between pe-5 ps-4"
                to={`/questionnaires/${item._id}`}
            >
                <div>
                    <p className="text-black dark:text-white">{item.name}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {item.city}
                    </p>
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
