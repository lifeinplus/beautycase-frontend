import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { MakeupBag } from '../types'
import classNames from 'classnames'

interface MakeupBagRowProps {
    item: MakeupBag
}

export const MakeupBagRow = ({ item }: MakeupBagRowProps) => {
    const cellClasses = ['text-center', 'text-center', 'text-left']

    const cellData = [
        format(item.createdAt || '', 'yyyy.MM.dd'),
        format(item.createdAt || '', 'HH:mm'),
        item.clientId.username,
    ]

    return (
        <tr className="tr">
            {cellData.map((data, idx) => (
                <td key={idx} className={classNames('td', cellClasses[idx])}>
                    {data}
                </td>
            ))}

            <td className={classNames('td', 'td-actions')}>
                <Link className="td-action" to={`/makeup_bags/${item._id}`}>
                    <EyeIcon className="h-6 w-6" />
                </Link>
                <Link
                    className="td-action"
                    to={`/makeup_bags/edit/${item._id}`}
                >
                    <PencilSquareIcon className="h-6 w-6" />
                </Link>
            </td>
        </tr>
    )
}
