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
    { label: 'Заголовок', className: 'text-left' },
    { label: 'Подзаголовок', className: 'text-left' },
]

export const StageTable = ({ stages }: StageTableProps) => {
    const cellClasses = ['text-center', 'text-center', 'text-left', 'text-left']

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
                        item.subtitle,
                    ]}
                    redirectPath={`/stages/${item._id}`}
                />
            )}
        />
    )
}
