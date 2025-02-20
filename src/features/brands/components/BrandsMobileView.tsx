import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from '../../../app/hooks'
import { Button } from '../../../components'
import { useDeleteBrandMutation, type Brand } from '../../brands'
import { setFormData } from '../../form'

interface BrandsMobileViewProps {
    items?: Brand[]
}

export const BrandsMobileView = ({ items }: BrandsMobileViewProps) => {
    const dispatch = useAppDispatch()
    const [deleteBrand] = useDeleteBrandMutation()

    const handleEditBrand = (data: Brand) => {
        dispatch(setFormData(data))
    }

    const handleDeleteBrand = async (id: string) => {
        await deleteBrand(id).unwrap()
    }

    return (
        <div className="space-y-5 sm:hidden">
            {items?.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center justify-between pe-4 ps-4"
                >
                    <div>
                        <p className="text-black dark:text-white">
                            {item.name}
                        </p>
                    </div>
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
                </div>
            ))}
        </div>
    )
}
