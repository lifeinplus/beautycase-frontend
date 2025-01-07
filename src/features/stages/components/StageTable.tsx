import classNames from 'classnames'

import { Stage } from '../types'
import { StageRow } from './StageRow'

interface StageTableProps {
    stages?: Stage[]
}

const tableHeaders = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Название этапа', className: 'text-left' },
    { label: 'Действия', className: 'text-center' },
]

export const StageTable = ({ stages }: StageTableProps) => (
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
                {stages?.map((item) => <StageRow key={item._id} item={item} />)}
            </tbody>
        </table>
    </div>
)
