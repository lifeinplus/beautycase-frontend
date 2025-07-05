import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../shared/components/forms/Button'
import type { Store } from '../types'

export interface StoresMobileViewProps {
    items?: Store[]
    onDelete: (data: Store) => void
    onEdit: (data: Store) => void
}

export const StoresMobileView = ({
    items,
    onDelete,
    onEdit,
}: StoresMobileViewProps) => {
    const { t } = useTranslation('store')

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
                            aria-label={t('buttonEdit.ariaLabel')}
                            onClick={() => onEdit(item)}
                            variant="warning"
                        >
                            <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            aria-label={t('buttonDelete.ariaLabel')}
                            onClick={() => onDelete(item)}
                            variant="danger"
                        >
                            <MinusCircleIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
