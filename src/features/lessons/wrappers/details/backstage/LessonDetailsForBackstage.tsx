import { LessonDetails } from '@/pages/lessons/details/LessonDetails'
import { useToLessonGalleryAction } from '@/pages/lessons/gallery/hooks/useToLessonGalleryAction'

export const LessonDetailsForBackstage = () => {
    const action = useToLessonGalleryAction()
    return <LessonDetails onBack={action.onClick} />
}
