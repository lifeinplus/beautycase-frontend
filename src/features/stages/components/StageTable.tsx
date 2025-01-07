import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { formatDate } from '../../../utils'
import type { Stage } from '../types'

interface StageTableProps {
    stages?: Stage[]
}

const headers: Header[] = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Название этапа', className: 'text-left' },
    { label: 'Действия', className: 'text-center' },
]

export const StageTable = ({ stages }: StageTableProps) => {
    const cellClasses = ['text-center', 'text-center', 'text-left']

    return (
        <Table
            headers={headers}
            data={stages}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[
                        formatDate(item.createdAt, 'yyyy.MM.dd'),
                        formatDate(item.createdAt, 'HH:mm'),
                        item.title,
                    ]}
                    actions={
                        <>
                            <Link
                                className="td-action"
                                to={`/stages/${item._id}`}
                            >
                                <EyeIcon className="h-6 w-6" />
                            </Link>
                            <Link
                                className="td-action"
                                to={`/stages/edit/${item._id}`}
                            >
                                <PencilSquareIcon className="h-6 w-6" />
                            </Link>
                        </>
                    }
                />
            )}
        />
    )
}
