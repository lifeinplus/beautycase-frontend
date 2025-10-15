import { useTranslation } from 'react-i18next'

import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { User } from '../../types'

export interface UsersTableProps {
    data?: User[]
}

export const UsersTable = ({ data }: UsersTableProps) => {
    const { t } = useTranslation('user')

    const headers: Header[] = [
        { label: t('table.createdAt'), className: 'text-center' },
        { label: t('table.username'), className: 'text-left' },
        { label: t('table.role'), className: 'text-left' },
        { label: t('table.updatedAt'), className: 'text-center' },
    ]

    const cellClasses = headers.map((h) => h.className)

    return (
        <Table
            headers={headers}
            data={data}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[
                        formatDate(item.createdAt, 'yyyy.MM.dd HH:mm'),
                        item.username,
                        t(`account:fields.role.types.${item?.role}`),
                        formatDate(item.updatedAt, 'yyyy.MM.dd HH:mm'),
                    ]}
                    redirectPath={`/users/${item._id}`}
                />
            )}
        />
    )
}
