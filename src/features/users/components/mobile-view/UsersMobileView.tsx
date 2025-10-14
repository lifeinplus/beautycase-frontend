import { useTranslation } from 'react-i18next'

import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { formatDate } from '@/shared/utils/date/formatDate'
import type { User } from '../../types'

export interface UsersMobileViewProps {
    data?: User[]
}

export const UsersMobileView = ({ data }: UsersMobileViewProps) => {
    const { t } = useTranslation(['user', 'account'])

    return (
        <MobileView
            items={data}
            getTitle={(item) => item.username}
            getDescription={(item) =>
                t(`account:fields.role.types.${item?.role}`)
            }
            getRightText={(item) =>
                formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')
            }
            getLink={(item) => `/users/${item._id}`}
        />
    )
}
