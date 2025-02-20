import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from '../../../app/hooks'
import { Button, Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { type Brand } from '../../brands'
import { setFormData } from '../../form'

interface BrandsTableProps {
    items?: Brand[]
    onDelete: (data: Brand) => void
}

const headers: Header[] = [
    { label: 'Бренд', className: 'text-left w-auto' },
    { label: 'Действия', className: 'text-center w-1' },
]

const cellClasses = headers.map((h) => h.className)

export const BrandsTable = ({ items, onDelete }: BrandsTableProps) => {
    const dispatch = useAppDispatch()

    return (
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
                                variant="warning"
                                onClick={() => dispatch(setFormData(item))}
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => onDelete(item)}
                            >
                                <MinusCircleIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    }
                />
            )}
        />
    )
}
