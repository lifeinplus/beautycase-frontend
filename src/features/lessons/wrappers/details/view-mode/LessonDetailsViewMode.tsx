import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { LessonDetails } from '@/pages/lessons/details/LessonDetails'

export const LessonDetailsViewMode = () => {
    const action = useToAccountAction()
    return <LessonDetails onBack={action.onClick} viewMode />
}
