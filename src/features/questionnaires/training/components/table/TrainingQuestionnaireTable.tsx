import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'
import { Role } from '@/shared/model/role'
import { formatDate } from '@/shared/utils/date/formatDate'
import { getFullName } from '@/shared/utils/ui/getFullName'
import type { TrainingQuestionnaire } from '../../../types'

export interface TrainingQuestionnaireTableProps {
    data?: TrainingQuestionnaire[]
}

export const TrainingQuestionnaireTable = ({
    data,
}: TrainingQuestionnaireTableProps) => {
    const { t } = useTranslation('questionnaire')

    const role = useAppSelector(selectRole)
    const isAdmin = role === Role.ADMIN

    const headers: Header[] = [
        { label: t('training.table.date'), className: 'text-center' },
        { label: t('training.table.time'), className: 'text-center' },
        { label: t('training.table.clientName'), className: 'text-left' },
        isAdmin
            ? { label: t('training.table.muaName'), className: 'text-left' }
            : { label: t('training.table.contact'), className: 'text-left' },
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
                        formatDate(item.createdAt, 'yyyy.MM.dd'),
                        formatDate(item.createdAt, 'HH:mm'),
                        item.name,
                        isAdmin
                            ? getFullName(
                                  item.mua?.firstName,
                                  item.mua?.lastName
                              )
                            : item.contact,
                    ]}
                    redirectPath={`/questionnaires/trainings/${item._id}`}
                />
            )}
        />
    )
}
