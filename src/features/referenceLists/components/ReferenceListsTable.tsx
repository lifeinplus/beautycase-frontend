import { Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { type ReferenceList } from '../../referenceLists'

interface ReferenceListsTableProps {
    data?: ReferenceList[]
}

const headers: Header[] = [{ label: 'Справочник', className: 'text-left' }]

export const ReferenceListsTable = ({ data }: ReferenceListsTableProps) => {
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
