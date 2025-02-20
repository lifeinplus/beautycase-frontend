import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from '../../../app/hooks'
import { Button } from '../../../components'
import { setFormData } from '../../form'
import { useDeleteStoreMutation, type Store } from '../../stores'

interface StoresMobileViewProps {
    items?: Store[]
}

export const StoresMobileView = ({ items }: StoresMobileViewProps) => {
    const dispatch = useAppDispatch()
    const [deleteStore] = useDeleteStoreMutation()

    const handleEditStore = (data: Store) => {
        dispatch(setFormData(data))
    }

    const handleDeleteStore = async (id: string) => {
        await deleteStore(id).unwrap()
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
                </div>
            ))}
        </div>
    )
}
