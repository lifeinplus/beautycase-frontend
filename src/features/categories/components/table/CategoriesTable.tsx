import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components/forms/button/Button'
import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import type { Category } from '../../types'

export interface CategoriesTableProps {
    items?: Category[]
    onDelete: (data: Category) => void
    onEdit: (data: Category) => void
}

export const CategoriesTable = ({
    items,
    onDelete,
    onEdit,
}: CategoriesTableProps) => {
    const { t } = useTranslation('category')

    const headers: Header[] = [
        { label: t('table.type'), className: 'text-left w-auto' },
        { label: t('table.category'), className: 'text-left w-auto' },
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
                    cellData={[item.type, item.name]}
                    actions={
                        <div className="flex gap-2">
                            <Button
                                aria-label={t('buttons.categoryEdit.ariaLabel')}
                                onClick={() => onEdit(item)}
                                variant="warning"
                            >
                                <EllipsisHorizontalCircleIcon className="size-5" />
                            </Button>

                            <Button
                                aria-label={t(
                                    'buttons.categoryDelete.ariaLabel'
                                )}
                                onClick={() => onDelete(item)}
                                variant="danger"
                            >
                                <MinusCircleIcon className="size-5" />
                            </Button>
                        </div>
                    }
                />
            )}
        />
    )
}
