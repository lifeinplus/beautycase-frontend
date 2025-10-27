import { useTranslation } from 'react-i18next'

import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import { ROUTES } from '@/shared/config/routes'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { Stage } from '../../types'

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
                    redirectPath={ROUTES.backstage.stages.details(item._id!)}
                />
            )}
        />
    )
}
