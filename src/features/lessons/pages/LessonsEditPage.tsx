import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LoadingOrError } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
import {
    type Lesson,
    LessonForm,
    useEditLessonMutation,
    useGetLessonByIdQuery,
} from '../../lessons'

export const LessonEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editLesson] = useEditLessonMutation()
    const { data, isLoading, error } = useGetLessonByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    title: data.title,
                    shortDescription: data.shortDescription,
                    videoUrl: data.videoUrl,
                    fullDescription: data.fullDescription,
                    selectedProductIds: data.productIds?.map((p) => p._id!),
                })
            )
        }
    }, [data, dispatch, isDirty])

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Урок не найден" />

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
