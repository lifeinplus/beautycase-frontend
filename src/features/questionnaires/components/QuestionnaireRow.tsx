import { EyeIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { formatDate } from '../../../utils'
import { Questionnaire } from '../types'

interface QuestionnaireRowProps {
    item: Questionnaire
}

export const QuestionnaireRow = ({ item }: QuestionnaireRowProps) => {
    const cellClasses = [
        'text-center',
        'text-center',
        'text-left',
        'text-right',
        'text-left',
    ]

    const cellData = [
        formatDate(item.createdAt, 'yyyy.MM.dd'),
        formatDate(item.createdAt, 'HH:mm'),
        item.name,
        item.age,
        item.city,
    ]

    return (
        <tr className="tr">
            {cellData.map((data, idx) => (
                <td key={idx} className={classNames('td', cellClasses[idx])}>
                    {data}
                </td>
            ))}

            <td className={classNames('td', 'td-actions')}>
                <Link className="td-action" to={`/questionnaires/${item._id}`}>
                    <EyeIcon className="h-6 w-6" />
                </Link>
            </td>
        </tr>
    )
}
