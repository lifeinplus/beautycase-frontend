import { Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { type ReferenceList } from '../../referenceLists'

interface ReferenceListsTableProps {
    referenceLists?: ReferenceList[]
}

const headers: Header[] = [{ label: 'Справочник', className: 'text-left' }]

export const ReferenceListsTable = ({
    referenceLists,
}: ReferenceListsTableProps) => {
    const cellClasses = headers.map((h) => h.className)

    return (
        <Table
            headers={headers}
            data={referenceLists}
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
