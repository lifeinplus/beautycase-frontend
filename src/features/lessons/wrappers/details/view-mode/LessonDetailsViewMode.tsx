import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { LessonDetails } from '@/widgets/lesson/details/LessonDetails'

export const LessonDetailsViewMode = () => {
    const action = useToAccountAction()
    return <LessonDetails onBack={action.onClick} viewMode />
}
