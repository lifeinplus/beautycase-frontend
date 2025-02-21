import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { Button, Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { type Store } from '../../stores'

interface StoresTableProps {
    items?: Store[]
    onDelete: (data: Store) => void
    onEdit: (data: Store) => void
}

const headers: Header[] = [
    { label: 'Магазин', className: 'text-left w-auto' },
    { label: 'Действия', className: 'text-center w-1' },
]

const cellClasses = headers.map((h) => h.className)

export const StoresTable = ({ items, onDelete, onEdit }: StoresTableProps) => (
    <Table
        headers={headers}
        data={items}
        renderRow={(item) => (
            <TableRow
                key={item._id}
                cellClasses={cellClasses}
                cellData={[item.name]}
                actions={
                    <div className="flex gap-2">
                        <Button variant="warning" onClick={() => onEdit(item)}>
                            <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(item)}>
                            <MinusCircleIcon className="h-5 w-5" />
                        </Button>
                    </div>
                }
            />
        )}
    />
)
