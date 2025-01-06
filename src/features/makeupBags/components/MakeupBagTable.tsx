import classNames from 'classnames'

import { MakeupBag } from '../types'
import { MakeupBagRow } from './MakeupBagRow'

interface MakeupBagTableProps {
    makeupBags?: MakeupBag[]
}

const tableHeaders = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Имя пользователя', className: 'text-left' },
    { label: 'Действия', className: 'text-center' },
]

export const MakeupBagTable = ({ makeupBags }: MakeupBagTableProps) => (
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
                {makeupBags?.map((item) => (
                    <MakeupBagRow key={item._id} item={item} />
                ))}
            </tbody>
        </table>
    </div>
)
