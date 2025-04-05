import { MobileView } from '../../../components/table/MobileView'
import { formatDate } from '../../../utils/date'
import type { Stage } from '../types'

interface StageMobileViewProps {
    stages?: Stage[]
}

export const StageMobileView = ({ stages }: StageMobileViewProps) => (
    <MobileView
        items={stages}
        getTitle={(item) => item.title}
        getDate={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => `/stages/${item._id}`}
    />
)
