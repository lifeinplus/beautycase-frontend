import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '../../../components/ui/Button'
import type { Store } from '../types'

interface StoresMobileViewProps {
    items?: Store[]
    onDelete: (data: Store) => void
    onEdit: (data: Store) => void
}

export const StoresMobileView = ({
    items,
    onDelete,
    onEdit,
}: StoresMobileViewProps) => (
    <div className="space-y-5 sm:hidden">
        {items?.map((item) => (
            <div
                key={item._id}
                className="flex items-center justify-between pe-4 ps-4"
            >
                <div>
                    <p className="text-black dark:text-white">{item.name}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="warning" onClick={() => onEdit(item)}>
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
