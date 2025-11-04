import { useTranslation } from 'react-i18next'

import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import { ROUTES } from '@/shared/config/routes'
import { formatDate } from '@/shared/utils/date/formatDate'
import { getFullName } from '@/shared/utils/ui/getFullName'
import type { MakeupBag } from '../../types'

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
                        getFullName(
                            item.client?.firstName,
                            item.client?.lastName
                        ),
                    ]}
                    redirectPath={ROUTES.backstage.makeupBags.details(
                        item._id!
                    )}
                />
            )}
        />
    )
}
