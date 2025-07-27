import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { LessonForm } from '@/features/lessons/components/LessonForm'
import { useCreateLessonMutation } from '@/features/lessons/lessonsApi'
import { Lesson } from '@/features/lessons/types'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const LessonAdd = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('lesson')

    const dispatch = useAppDispatch()
    const [createLesson] = useCreateLessonMutation()

    const handleAddLesson = async (lesson: Lesson) => {
        try {
            const response = await createLesson(lesson).unwrap()
            dispatch(clearFormData())
            navigate(`/lessons/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <LessonForm title={t('titles.add')} onSubmit={handleAddLesson} />
}
