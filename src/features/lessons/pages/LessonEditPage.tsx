import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { LessonForm } from '../components/LessonForm'
import {
    useUpdateLessonByIdMutation,
    useGetLessonByIdQuery,
} from '../lessonsApi'
import type { Lesson } from '../types'

export const LessonEditPage = () => {
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
            navigate(`/lessons/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <LessonForm title={t('titles.edit')} onSubmit={handleEditLesson} />
}
