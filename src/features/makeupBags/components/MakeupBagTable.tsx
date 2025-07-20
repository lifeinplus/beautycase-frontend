import { useTranslation } from 'react-i18next'

import { Table } from '@/shared/components/table/Table'
import { TableRow } from '@/shared/components/table/TableRow'
import type { Header } from '@/shared/types/table'
import { formatDate } from '@/shared/utils/date'
import type { MakeupBag } from '../types'

export interface MakeupBagTableProps {
    makeupBags?: MakeupBag[]
}

export const MakeupBagTable = ({ makeupBags }: MakeupBagTableProps) => {
    const { t } = useTranslation('makeupBag')

    const headers: Header[] = [
        { label: t('table.date'), className: 'text-center' },
        { label: t('table.time'), className: 'text-center' },
        { label: t('table.category'), className: 'text-left' },
        { label: t('table.clientName'), className: 'text-left' },
    ]

    const cellClasses = headers.map((h) => h.className)

    return (
        <Table
            headers={headers}
            data={makeupBags}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[
                        formatDate(item.createdAt, 'yyyy.MM.dd'),
                        formatDate(item.createdAt, 'HH:mm'),
                        t(`categories.${item.category?.name}.short`),
                        item.client?.username || '–',
                    ]}
                    redirectPath={`/makeup-bag/${item._id}`}
                />
            )}
        />
    )
}
