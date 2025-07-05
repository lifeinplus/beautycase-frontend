import { useTranslation } from 'react-i18next'

import { Table } from '@/shared/components/table/Table'
import { TableRow } from '@/shared/components/table/TableRow'
import type { Header } from '@/shared/types/table'
import { formatDate } from '@/shared/utils/date'
import type { Questionnaire } from '../types'

export interface QuestionnaireTableProps {
    questionnaires?: Questionnaire[]
}

export const QuestionnaireTable = ({
    questionnaires,
}: QuestionnaireTableProps) => {
    const { t } = useTranslation('questionnaire')

    const headers: Header[] = [
        { label: t('table.date'), className: 'text-center' },
        { label: t('table.time'), className: 'text-center' },
        { label: t('table.clientName'), className: 'text-left' },
        { label: t('table.age'), className: 'text-right' },
        { label: t('table.city'), className: 'text-left' },
    ]

    const cellClasses = headers.map((h) => h.className)

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
