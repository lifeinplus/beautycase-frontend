import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from '../../../app/hooks'
import { Button } from '../../../components'
import { type Brand } from '../../brands'
import { setFormData } from '../../form'

interface BrandsMobileViewProps {
    items?: Brand[]
    onDelete: (data: Brand) => void
}

export const BrandsMobileView = ({
    items,
    onDelete,
}: BrandsMobileViewProps) => {
    const dispatch = useAppDispatch()

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
                            onClick={() => dispatch(setFormData(item))}
                        >
                            <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(item)}>
                            <MinusCircleIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
