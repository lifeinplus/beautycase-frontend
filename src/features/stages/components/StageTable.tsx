import { useTranslation } from 'react-i18next'

import { Table } from '@/shared/components/table/Table'
import { TableRow } from '@/shared/components/table/TableRow'
import type { Header } from '@/shared/types/table'
import { formatDate } from '@/shared/utils/date'
import type { Stage } from '../types'

export interface StageTableProps {
    stages?: Stage[]
}

export const StageTable = ({ stages }: StageTableProps) => {
    const { t } = useTranslation('stage')

    const headers: Header[] = [
        { label: t('table.date'), className: 'text-center' },
        { label: t('table.time'), className: 'text-center' },
        { label: t('table.title'), className: 'text-left' },
        { label: t('table.subtitle'), className: 'text-left' },
    ]

    const cellClasses = headers.map((h) => h.className)

    return (
        <Table
            headers={headers}
            data={stages}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[
                        formatDate(item.createdAt, 'yyyy.MM.dd'),
                        formatDate(item.createdAt, 'HH:mm'),
                        item.title,
                        item.subtitle,
                    ]}
                    redirectPath={`/stages/${item._id}`}
                />
            )}
        />
    )
}
