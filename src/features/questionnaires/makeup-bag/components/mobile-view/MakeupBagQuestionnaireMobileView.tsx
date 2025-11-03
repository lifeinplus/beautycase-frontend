import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { Role } from '@/shared/model/role'
import { formatDate } from '@/shared/utils/date/formatDate'
import { getFullName } from '@/shared/utils/ui/getFullName'

export interface MakeupBagQuestionnaireMobileViewProps {
    questionnaires?: MakeupBagQuestionnaire[]
}

export const MakeupBagQuestionnaireMobileView = ({
    questionnaires,
}: MakeupBagQuestionnaireMobileViewProps) => {
    const role = useAppSelector(selectRole)

    return (
        <MobileView
            items={questionnaires}
            getTitle={(item) => item.name}
            getDescription={(item) =>
                role === Role.ADMIN
                    ? getFullName(item.mua?.firstName, item.mua?.lastName)
                    : item.city || '—'
            }
            getRightText={(item) =>
                formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')
            }
            getLink={(item) => `/questionnaires/makeup-bags/${item._id}`}
        />
    )
}
