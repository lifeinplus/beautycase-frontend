import { MobileView } from '../../../components'
import { formatDate } from '../../../utils'
import type { Questionnaire } from '../types'

interface QuestionnaireMobileViewProps {
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
