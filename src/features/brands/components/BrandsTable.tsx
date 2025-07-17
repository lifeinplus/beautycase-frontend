import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components/forms/Button'
import { Table } from '@/shared/components/table/Table'
import { TableRow } from '@/shared/components/table/TableRow'
import type { Header } from '@/shared/types/table'
import type { Brand } from '../types'

export interface BrandsTableProps {
    items?: Brand[]
    onDelete: (data: Brand) => void
    onEdit: (data: Brand) => void
}

export const BrandsTable = ({ items, onDelete, onEdit }: BrandsTableProps) => {
    const { t } = useTranslation('brand')

    const headers: Header[] = [
        { label: t('table.brandName'), className: 'text-left w-auto' },
        { label: t('table.actions'), className: 'text-center w-1' },
    ]

    const cellClasses = headers.map((h) => h.className)

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
                                aria-label={t('buttons.brandEdit.ariaLabel')}
                                onClick={() => onEdit(item)}
                                variant="warning"
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>

                            <Button
                                aria-label={t('buttons.brandDelete.ariaLabel')}
                                onClick={() => onDelete(item)}
                                variant="danger"
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
