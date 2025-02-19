import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { Button, Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { useDeleteBrandMutation, type Brand } from '../../brands'
import { Dispatch, SetStateAction } from 'react'

interface BrandsTableProps {
    data?: Brand[]
    setBrandName: Dispatch<SetStateAction<string>>
    setEditId: Dispatch<SetStateAction<string | null>>
}

const headers: Header[] = [
    { label: 'Бренд', className: 'text-left w-auto' },
    { label: 'Действия', className: 'text-center w-1' },
]

export const BrandsTable = ({
    data,
    setBrandName,
    setEditId,
}: BrandsTableProps) => {
    const cellClasses = headers.map((h) => h.className)

    const [deleteBrand] = useDeleteBrandMutation()

    const handleEditBrand = (id: string, name: string) => {
        setEditId(id)
        setBrandName(name)
    }

    const handleDeleteBrand = async (id: string) => {
        await deleteBrand(id).unwrap()
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
                                onClick={() =>
                                    handleEditBrand(item._id, item.name)
                                }
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteBrand(item._id)}
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
