import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
    clearFormData,
    selectIsDirty,
    setFormData,
} from '@/features/form/formSlice'
import { LessonForm } from '@/features/lessons/components/LessonForm'
import {
    useGetLessonByIdQuery,
    useUpdateLessonByIdMutation,
} from '@/features/lessons/lessonsApi'
import type { Lesson } from '@/features/lessons/types'
import type { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const LessonEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('lesson')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateLessonById] = useUpdateLessonByIdMutation()
    const { data } = useGetLessonByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    title: data.title,
                    shortDescription: data.shortDescription,
                    videoUrl: data.videoUrl,
                    fullDescription: data.fullDescription,
                    productIds: data.products?.map((p) => p._id!),
                    clientIds: data.clientIds,
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditLesson = async (lesson: Lesson) => {
        try {
            await updateLessonById({ id: id!, lesson }).unwrap()
            dispatch(clearFormData())
            navigate(`/lessons/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <LessonForm title={t('titles.edit')} onSubmit={handleEditLesson} />
}
