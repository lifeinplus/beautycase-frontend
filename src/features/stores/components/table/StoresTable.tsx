import {
    EllipsisHorizontalCircleIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components/forms/button/Button'
import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import type { Store } from '../../types'

export interface StoresTableProps {
    items?: Store[]
    onDelete: (data: Store) => void
    onEdit: (data: Store) => void
}

export const StoresTable = ({ items, onDelete, onEdit }: StoresTableProps) => {
    const { t } = useTranslation('store')

    const headers: Header[] = [
        { label: t('table.store'), className: 'text-left w-auto' },
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
                                aria-label={t('buttons.edit.ariaLabel')}
                                onClick={() => onEdit(item)}
                                variant="warning"
                            >
                                <EllipsisHorizontalCircleIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                aria-label={t('buttons.delete.ariaLabel')}
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
