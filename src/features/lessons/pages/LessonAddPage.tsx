import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { LessonForm } from '../components/LessonForm'
import { useCreateLessonMutation } from '../lessonsApi'
import type { Lesson } from '../types'

export const LessonAddPage = () => {
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
