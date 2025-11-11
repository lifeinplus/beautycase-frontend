import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components/forms/button/Button'
import type { Category } from '../../types'

export interface CategoriesMobileViewProps {
    items?: Category[]
    onDelete: (data: Category) => void
    onEdit: (data: Category) => void
}

export const CategoriesMobileView = ({
    items,
    onDelete,
    onEdit,
}: CategoriesMobileViewProps) => {
    const { t } = useTranslation('category')

    return (
        <div className="space-y-5 md:hidden">
            {items?.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center justify-between px-4"
                >
                    <div className="w-1/3">
                        <p className="truncate text-black dark:text-white">
                            {item.type}
                        </p>
                    </div>

                    <div className="w-1/3">
                        <p className="truncate text-black dark:text-white">
                            {item.name}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            aria-label={t('buttons.categoryEdit.ariaLabel')}
                            onClick={() => onEdit(item)}
                            variant="warning"
                        >
                            <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            aria-label={t('buttons.categoryDelete.ariaLabel')}
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
