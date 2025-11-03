import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { Role } from '@/shared/model/role'
import { formatDate } from '@/shared/utils/date/formatDate'
import { getFullName } from '@/shared/utils/ui/getFullName'
import type { TrainingQuestionnaire } from '../../../types'

export interface TrainingQuestionnaireMobileViewProps {
    data?: TrainingQuestionnaire[]
}

export const TrainingQuestionnaireMobileView = ({
    data,
}: TrainingQuestionnaireMobileViewProps) => {
    const role = useAppSelector(selectRole)

    return (
        <MobileView
            items={data}
            getTitle={(item) => item.name}
            getDescription={(item) =>
                role === Role.ADMIN
                    ? getFullName(item.mua?.firstName, item.mua?.lastName)
                    : item.contact
            }
            getRightText={(item) =>
                formatDate(item.createdAt, 'yyyy.MM.dd HH:mm')
            }
            getLink={(item) => `/questionnaires/trainings/${item._id}`}
        />
    )
}
