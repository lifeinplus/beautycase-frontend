import { MobileView } from '../../../components/table/MobileView'
import { formatDate } from '../../../utils/date'
import type { Questionnaire } from '../types'

export interface QuestionnaireMobileViewProps {
    questionnaires?: Questionnaire[]
}

export const QuestionnaireMobileView = ({
    questionnaires,
}: QuestionnaireMobileViewProps) => (
    <MobileView
        items={questionnaires}
        getTitle={(item) => item.name}
        getSubtitle={(item) => item.city || '—'}
        getDate={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => `/questionnaires/${item._id}`}
    />
)
