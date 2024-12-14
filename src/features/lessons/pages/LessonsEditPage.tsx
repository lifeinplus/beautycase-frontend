import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { clearSelectedProductIds } from '../../products'
import LessonForm from '../components/LessonForm'
import {
    useEditLessonMutation,
    useGetLessonByIdQuery,
} from '../lessonsApiSlice'
import type { Lesson } from '../types'

export const LessonEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
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
        dispatch(clearSelectedProductIds())
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
