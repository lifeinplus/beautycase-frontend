import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { Button, Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { useDeleteStoreMutation, type Store } from '../../stores'
import { Dispatch, SetStateAction } from 'react'

interface StoresTableProps {
    stores?: Store[]
    setStoreName: Dispatch<SetStateAction<string>>
    setEditId: Dispatch<SetStateAction<string | null>>
}

const headers: Header[] = [
    { label: 'Магазин', className: 'text-left w-auto' },
    { label: 'Действия', className: 'text-center w-1' },
]

export const StoresTable = ({
    stores,
    setStoreName,
    setEditId,
}: StoresTableProps) => {
    const cellClasses = headers.map((h) => h.className)

    const [deleteStore] = useDeleteStoreMutation()

    const handleEditStore = (id: string, name: string) => {
        setEditId(id)
        setStoreName(name)
    }

    const handleDeleteStore = async (id: string) => {
        await deleteStore(id).unwrap()
    }

    return (
        <Table
            headers={headers}
            data={stores}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[item.name]}
                    actions={
                        <div className="flex gap-2">
                            <Button
                                variant="warning"
                                onClick={() =>
                                    handleEditStore(item._id, item.name)
                                }
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteStore(item._id)}
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
