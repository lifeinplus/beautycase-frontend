import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { Table, TableRow } from '../../../components'
import { Header } from '../../../types'
import { formatDate } from '../../../utils'
import { MakeupBag } from '../types'

interface MakeupBagTableProps {
    makeupBags?: MakeupBag[]
}

const headers: Header[] = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Имя клиента', className: 'text-left' },
    { label: 'Действия', className: 'text-center' },
]

export const MakeupBagTable = ({ makeupBags }: MakeupBagTableProps) => {
    const cellClasses = ['text-center', 'text-center', 'text-left']

    return (
        <Table
            headers={headers}
            data={makeupBags}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[
                        formatDate(item.createdAt, 'yyyy.MM.dd'),
                        formatDate(item.createdAt, 'HH:mm'),
                        item.clientId.username,
                    ]}
                    redirectPath={`/makeup_bags/${item._id}`}
                    actions={
                        <Link
                            className="td-action"
                            to={`/makeup_bags/edit/${item._id}`}
                        >
                            <PencilSquareIcon className="h-6 w-6" />
                        </Link>
                    }
                />
            )}
        />
    )
}
