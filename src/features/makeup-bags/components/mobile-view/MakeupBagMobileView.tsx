import { useTranslation } from 'react-i18next'

import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { ROUTES } from '@/shared/config/routes'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { MakeupBag } from '../../types'

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
            getDescription={(item) =>
                t(`categories.${item.category?.name}.short`)
            }
            getRightText={(item) =>
                formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')
            }
            getLink={(item) => ROUTES.backstage.makeupBags.details(item._id!)}
        />
    )
}
