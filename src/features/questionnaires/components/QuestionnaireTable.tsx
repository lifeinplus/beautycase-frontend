import { Table, TableRow } from '../../../components'
import type { Header } from '../../../types'
import { formatDate } from '../../../utils'
import type { Questionnaire } from '../types'

interface QuestionnaireTableProps {
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
