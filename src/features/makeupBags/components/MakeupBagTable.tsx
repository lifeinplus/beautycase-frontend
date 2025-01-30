import { Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { formatDate } from '../../../utils'
import { type MakeupBag } from '../../makeupBags'

interface MakeupBagTableProps {
    makeupBags?: MakeupBag[]
}

const headers: Header[] = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Категория', className: 'text-left' },
    { label: 'Клиент', className: 'text-left' },
]

export const MakeupBagTable = ({ makeupBags }: MakeupBagTableProps) => {
    const cellClasses = headers.map((h) => h.className)

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
                        item.category?.name,
                        item.client?.username,
                    ]}
                    redirectPath={`/makeup_bags/${item._id}`}
                />
            )}
        />
    )
}
