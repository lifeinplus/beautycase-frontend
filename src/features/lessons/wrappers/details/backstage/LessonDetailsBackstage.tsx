import { useToLessonGalleryAction } from '@/pages/lessons/gallery/hooks/useToLessonGalleryAction'
import { LessonDetails } from '@/widgets/lesson/details/LessonDetails'

export const LessonDetailsBackstage = () => {
    const action = useToLessonGalleryAction()
    return <LessonDetails onBack={action.onClick} />
}
