import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { ROUTES } from '@/shared/config/routes'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { Stage } from '../../types'

export interface StageMobileViewProps {
    stages?: Stage[]
}

export const StageMobileView = ({ stages }: StageMobileViewProps) => (
    <MobileView
        items={stages}
        getTitle={(item) => item.title}
        getRightText={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => ROUTES.backstage.stages.details(item._id!)}
    />
)
