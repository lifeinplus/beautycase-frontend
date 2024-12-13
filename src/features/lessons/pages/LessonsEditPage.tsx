import { useParams, useNavigate } from 'react-router-dom'

import LessonForm from '../components/LessonForm'
import {
    useEditLessonMutation,
    useGetLessonByIdQuery,
} from '../lessonsApiSlice'
import type { Lesson } from '../types'

export const LessonEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [editLesson] = useEditLessonMutation()
    const { data: initialLesson, isLoading } = useGetLessonByIdQuery(id!)

    if (isLoading) return <p>Loading...</p>

    if (!initialLesson) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Lesson not found</p>
            </div>
        )
    }

    const handleEditLesson = async (lesson: Lesson) => {
        await editLesson({
            id: id!,
            ...lesson,
        }).unwrap()
        navigate(`/lessons/${id}`)
    }

    return (
        <LessonForm
            initialData={initialLesson}
            onSubmit={handleEditLesson}
            title={'Редактировать урок'}
        />
    )
}
