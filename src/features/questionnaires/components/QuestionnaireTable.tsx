import { Table } from '../../../components/table/Table'
import { TableRow } from '../../../components/table/TableRow'
import type { Header } from '../../../types/table'
import { formatDate } from '../../../utils/date'
import type { Questionnaire } from '../types'

export interface QuestionnaireTableProps {
    questionnaires?: Questionnaire[]
}

const headers: Header[] = [
    { label: 'Дата', className: 'text-center' },
    { label: 'Время', className: 'text-center' },
    { label: 'Имя клиента', className: 'text-left' },
    { label: 'Возраст', className: 'text-right' },
    { label: 'Город', className: 'text-left' },
]

export const QuestionnaireTable = ({
    questionnaires,
}: QuestionnaireTableProps) => {
    const cellClasses = [
        'text-center',
        'text-center',
        'text-left',
        'text-right',
        'text-left',
    ]

    return (
        <Table
            headers={headers}
            data={questionnaires}
            renderRow={(item) => (
                <TableRow
                    key={item._id}
                    cellClasses={cellClasses}
                    cellData={[
                        formatDate(item.createdAt, 'yyyy.MM.dd'),
                        formatDate(item.createdAt, 'HH:mm'),
                        item.name,
                        item.age || '—',
                        item.city || '—',
                    ]}
                    redirectPath={`/questionnaires/${item._id}`}
                />
            )}
        />
    )
}
