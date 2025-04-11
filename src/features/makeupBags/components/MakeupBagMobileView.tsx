import { MobileView } from '../../../components/table/MobileView'
import { formatDate } from '../../../utils/date'
import type { MakeupBag } from '../types'

interface MakeupBagMobileViewProps {
    makeupBags?: MakeupBag[]
}

export const MakeupBagMobileView = ({
    makeupBags,
}: MakeupBagMobileViewProps) => (
    <MobileView
        items={makeupBags}
        getTitle={(item) => item.client?.username || ''}
        getSubtitle={(item) => item.category?.name || '—'}
        getDate={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => `/makeup_bags/${item._id}`}
    />
)
