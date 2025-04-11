import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { LessonForm } from '../components/LessonForm'
import { useAddLessonMutation } from '../lessonsApiSlice'
import type { Lesson } from '../types'

export const LessonAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [addLesson] = useAddLessonMutation()

    const handleAddLesson = async (lesson: Lesson) => {
        try {
            const response = await addLesson(lesson).unwrap()
            dispatch(clearFormData())
            navigate(`/lessons/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <LessonForm title={'Добавить урок'} onSubmit={handleAddLesson} />
}
