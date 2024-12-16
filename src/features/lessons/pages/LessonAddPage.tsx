import { useNavigate } from 'react-router-dom'

import LessonForm from '../components/LessonForm'
import { useAddLessonMutation } from '../lessonsApiSlice'
import { Lesson } from '../types'

export const LessonAddPage = () => {
    const navigate = useNavigate()
    const [createLesson] = useAddLessonMutation()

    const handleAddLesson = async (lesson: Lesson) => {
        await createLesson(lesson).unwrap()
        navigate('/lessons')
    }

    return <LessonForm onSubmit={handleAddLesson} title={'Добавить урок'} />
}
