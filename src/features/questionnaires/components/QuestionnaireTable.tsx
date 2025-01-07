import classNames from 'classnames'

import { Questionnaire } from '../types'
import { QuestionnaireRow } from './QuestionnaireRow'

interface QuestionnaireTableProps {
    questionnaires?: Questionnaire[]
}

const tableHeaders = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Имя клиента', className: 'text-left' },
    { label: 'Возраст', className: 'text-right' },
    { label: 'Город', className: 'text-left' },
    { label: 'Действия', className: 'text-center' },
]

export const QuestionnaireTable = ({
    questionnaires,
}: QuestionnaireTableProps) => (
    <div className="table-container">
        <table className="table">
            <thead>
                <tr>
                    {tableHeaders.map(({ label, className }) => (
                        <th key={label} className={classNames('th', className)}>
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {questionnaires?.map((item) => (
                    <QuestionnaireRow key={item._id} item={item} />
                ))}
            </tbody>
        </table>
    </div>
)
