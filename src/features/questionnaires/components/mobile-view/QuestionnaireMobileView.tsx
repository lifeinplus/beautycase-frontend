import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { Questionnaire } from '../../types'

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
