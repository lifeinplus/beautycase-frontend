import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from '../../../app/hooks'
import { Button, Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { setFormData } from '../../form'
import { useDeleteStoreMutation, type Store } from '../../stores'

interface StoresTableProps {
    data?: Store[]
}

const headers: Header[] = [
    { label: 'Магазин', className: 'text-left w-auto' },
    { label: 'Действия', className: 'text-center w-1' },
]

export const StoresTable = ({ data }: StoresTableProps) => {
    const cellClasses = headers.map((h) => h.className)

    const dispatch = useAppDispatch()
    const [deleteStore] = useDeleteStoreMutation()

    const handleEditStore = (store: Store) => {
        dispatch(setFormData(store))
    }

    const handleDeleteStore = async (id: string) => {
        await deleteStore(id).unwrap()
    }

    return (
        <Table
            headers={headers}
            data={data}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[item.name]}
                    actions={
                        <div className="flex gap-2">
                            <Button
                                variant="warning"
                                onClick={() => handleEditStore(item)}
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteStore(item._id!)}
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
