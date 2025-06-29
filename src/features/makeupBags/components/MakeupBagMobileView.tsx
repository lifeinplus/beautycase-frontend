import { useTranslation } from 'react-i18next'

import { MobileView } from '../../../components/table/MobileView'
import { formatDate } from '../../../utils/date'
import type { MakeupBag } from '../types'

export interface MakeupBagMobileViewProps {
    makeupBags?: MakeupBag[]
}

export const MakeupBagMobileView = ({
    makeupBags,
}: MakeupBagMobileViewProps) => {
    const { t } = useTranslation('makeupBag')

    return (
        <MobileView
            items={makeupBags}
            getTitle={(item) => item.client?.username || ''}
            getSubtitle={(item) => t(`categories.${item.category?.name}.short`)}
            getDate={(item) => formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')}
            getLink={(item) => `/makeup_bags/${item._id}`}
        />
    )
}
