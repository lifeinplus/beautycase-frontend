import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components/forms/button/Button'
import type { Brand } from '../../types'

export interface BrandsMobileViewProps {
    items?: Brand[]
    onDelete: (data: Brand) => void
    onEdit: (data: Brand) => void
}

export const BrandsMobileView = ({
    items,
    onDelete,
    onEdit,
}: BrandsMobileViewProps) => {
    const { t } = useTranslation('brand')

    return (
        <div className="space-y-5 md:hidden">
            {items?.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center justify-between ps-4 pe-4"
                >
                    <div>
                        <p className="text-black dark:text-white">
                            {item.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            aria-label={t('buttons.brandEdit.ariaLabel')}
                            onClick={() => onEdit(item)}
                            variant="warning"
                        >
                            <EllipsisHorizontalCircleIcon className="size-5" />
                        </Button>
                        <Button
                            aria-label={t('buttons.brandDelete.ariaLabel')}
                            onClick={() => onDelete(item)}
                            variant="danger"
                        >
                            <MinusCircleIcon className="size-5" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
