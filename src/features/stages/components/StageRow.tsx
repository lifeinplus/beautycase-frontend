import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { formatDate } from '../../../utils'
import { Stage } from '../types'

interface StageRowProps {
    item: Stage
}

export const StageRow = ({ item }: StageRowProps) => {
    const cellClasses = ['text-center', 'text-center', 'text-left']

    const cellData = [
        formatDate(item.createdAt, 'yyyy.MM.dd'),
        formatDate(item.createdAt, 'HH:mm'),
        item.title,
    ]

    return (
        <tr className="tr">
            {cellData.map((data, idx) => (
                <td key={idx} className={classNames('td', cellClasses[idx])}>
                    {data}
                </td>
            ))}

            <td className={classNames('td', 'td-actions')}>
                <Link className="td-action" to={`/stages/${item._id}`}>
                    <EyeIcon className="h-6 w-6" />
                </Link>
                <Link className="td-action" to={`/stages/edit/${item._id}`}>
                    <PencilSquareIcon className="h-6 w-6" />
                </Link>
            </td>
        </tr>
    )
}
