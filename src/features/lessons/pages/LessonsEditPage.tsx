import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
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
    const isDirty = useAppSelector(selectIsDirty)

    const [editLesson] = useEditLessonMutation()
    const { data: lesson, isLoading } = useGetLessonByIdQuery(id!)

    useEffect(() => {
        if (lesson && !isDirty) {
            dispatch(
                setFormData({
                    title: lesson?.title,
                    shortDescription: lesson?.shortDescription,
                    videoUrl: lesson?.videoUrl,
                    fullDescription: lesson?.fullDescription,
                    selectedProductIds: lesson?.productIds?.map((p) => p._id!),
                })
            )
        }
    }, [lesson, dispatch, isDirty])

    if (isLoading) return <p>Loading...</p>

    if (!lesson) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Lesson not found</p>
            </div>
        )
    }

    const handleEditLesson = async (lesson: Lesson) => {
        try {
            await editLesson({
                id: id!,
                ...lesson,
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/lessons/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <LessonForm title={'Редактировать урок'} onSubmit={handleEditLesson} />
    )
}
