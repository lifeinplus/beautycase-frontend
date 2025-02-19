import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '../../../components'
import { useDeleteBrandMutation, type Brand } from '../../brands'

interface BrandsMobileViewProps {
    data?: Brand[]
    getTitle: (item: Brand) => string
    setBrandName: Dispatch<SetStateAction<string>>
    setEditId: Dispatch<SetStateAction<string | null>>
}

export const BrandsMobileView = ({
    data,
    setBrandName,
    setEditId,
}: BrandsMobileViewProps) => {
    const [deleteBrand] = useDeleteBrandMutation()

    const handleEditBrand = (id: string, name: string) => {
        setEditId(id)
        setBrandName(name)
    }

    const handleDeleteBrand = async (id: string) => {
        await deleteBrand(id).unwrap()
    }

    return (
        <div className="space-y-5 sm:hidden">
            {data?.map((item) => (
                <div className="flex items-center justify-between pe-4 ps-4">
                    <div>
                        <p className="text-black dark:text-white">
                            {item.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="warning"
                            onClick={() => handleEditBrand(item._id, item.name)}
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
                </div>
            ))}
        </div>
    )
}
