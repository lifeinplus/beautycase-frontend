import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { TrainingQuestionnaire } from '../../../types'

export interface TrainingMobileViewProps {
    data?: TrainingQuestionnaire[]
}

export const TrainingMobileView = ({ data }: TrainingMobileViewProps) => (
    <MobileView
        items={data}
        getTitle={(item) => item.name}
        getDescription={(item) => item.contact}
        getRightText={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => `/questionnaires/trainings/${item._id}`}
    />
)
