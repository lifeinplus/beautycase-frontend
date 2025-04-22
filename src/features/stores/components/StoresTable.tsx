import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { Table } from '../../../components/table/Table'
import { TableRow } from '../../../components/table/TableRow'
import { Button } from '../../../components/ui/Button'
import type { Header } from '../../../types/table'
import type { Store } from '../types'

export interface StoresTableProps {
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
                        <Button
                            aria-label="Edit Button"
                            onClick={() => onEdit(item)}
                            variant="warning"
                        >
                            <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            aria-label="Delete Button"
                            onClick={() => onDelete(item)}
                            variant="danger"
                        >
                            <MinusCircleIcon className="h-5 w-5" />
                        </Button>
                    </div>
                }
            />
        )}
    />
)
