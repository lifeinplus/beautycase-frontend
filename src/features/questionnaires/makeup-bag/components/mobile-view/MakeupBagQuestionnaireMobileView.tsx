import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { formatDate } from '@/shared/utils/date/formatDate'

export interface MakeupBagQuestionnaireMobileViewProps {
    questionnaires?: MakeupBagQuestionnaire[]
}

export const MakeupBagQuestionnaireMobileView = ({
    questionnaires,
}: MakeupBagQuestionnaireMobileViewProps) => (
    <MobileView
        items={questionnaires}
        getTitle={(item) => item.name}
        getDescription={(item) => item.city || '—'}
        getRightText={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => `/questionnaires/makeup-bags/${item._id}`}
    />
)
