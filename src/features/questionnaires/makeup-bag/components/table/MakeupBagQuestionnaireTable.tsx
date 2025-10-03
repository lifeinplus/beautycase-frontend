import { useTranslation } from 'react-i18next'

import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import { formatDate } from '@/shared/utils/date/formatDate'

export interface MakeupBagQuestionnaireTableProps {
    questionnaires?: MakeupBagQuestionnaire[]
}

export const MakeupBagQuestionnaireTable = ({
    questionnaires,
}: MakeupBagQuestionnaireTableProps) => {
    const { t } = useTranslation('questionnaire')

    const headers: Header[] = [
        { label: t('makeupBag.table.date'), className: 'text-center' },
        { label: t('makeupBag.table.time'), className: 'text-center' },
        { label: t('makeupBag.table.clientName'), className: 'text-left' },
        { label: t('makeupBag.table.age'), className: 'text-right' },
        { label: t('makeupBag.table.city'), className: 'text-left' },
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
                    redirectPath={`/questionnaires/makeup-bags/${item._id}`}
                />
            )}
        />
    )
}
