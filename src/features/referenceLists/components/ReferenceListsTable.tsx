import { useTranslation } from 'react-i18next'

import { Table } from '../../../shared/components/table/Table'
import { TableRow } from '../../../shared/components/table/TableRow'
import type { Header } from '../../../shared/types/table'
import type { ReferenceList } from '../types'

export interface ReferenceListsTableProps {
    data?: ReferenceList[]
}

export const ReferenceListsTable = ({ data }: ReferenceListsTableProps) => {
    const { t } = useTranslation('referenceList')

    const headers: Header[] = [
        { label: t('table.referenceList'), className: 'text-left' },
    ]

    const cellClasses = headers.map((h) => h.className)

    return (
        <Table
            headers={headers}
            data={data}
            renderRow={(item) => (
                <TableRow
                    key={item.id}
                    cellClasses={cellClasses}
                    cellData={[item.name]}
                    redirectPath={`/reference_lists/${item.id}`}
                />
            )}
        />
    )
}
