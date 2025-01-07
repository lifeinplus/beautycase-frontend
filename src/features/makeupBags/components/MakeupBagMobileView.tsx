import { MobileView } from '../../../components'
import { formatDate } from '../../../utils'
import type { MakeupBag } from '../types'

interface MakeupBagMobileViewProps {
    makeupBags?: MakeupBag[]
}

export const MakeupBagMobileView = ({
    makeupBags,
}: MakeupBagMobileViewProps) => (
    <MobileView
        items={makeupBags}
        getTitle={(item) => item.clientId.username}
        getDate={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
        getLink={(item) => `/makeup_bags/${item._id}`}
    />
)
