import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import {
    clearFormData,
    selectIsDirty,
    setFormData,
} from '@/features/form/slice/formSlice'
import {
    useGetLessonByIdQuery,
    useUpdateLessonByIdMutation,
} from '@/features/lessons/api/lessonsApi'
import { LessonForm } from '@/features/lessons/components/form/LessonForm'
import type { Lesson } from '@/features/lessons/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const LessonEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
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
            navigate(ROUTES.backstage.lessons.details(id!))
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <LessonForm title={t('titles.edit')} onSubmit={handleEditLesson} />
}
