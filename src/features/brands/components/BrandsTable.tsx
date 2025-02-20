import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from '../../../app/hooks'
import { Button, Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { useDeleteBrandMutation, type Brand } from '../../brands'
import { setFormData } from '../../form'

interface BrandsTableProps {
    items?: Brand[]
}

const headers: Header[] = [
    { label: 'Бренд', className: 'text-left w-auto' },
    { label: 'Действия', className: 'text-center w-1' },
]

export const BrandsTable = ({ items }: BrandsTableProps) => {
    const cellClasses = headers.map((h) => h.className)

    const dispatch = useAppDispatch()
    const [deleteBrand] = useDeleteBrandMutation()

    const handleEditBrand = (data: Brand) => {
        dispatch(setFormData(data))
    }

    const handleDeleteBrand = async (id: string) => {
        await deleteBrand(id).unwrap()
    }

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
                                onClick={() => handleEditBrand(item)}
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteBrand(item._id!)}
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
