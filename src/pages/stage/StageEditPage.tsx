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
import { StageForm } from '@/features/stages/components/StageForm'
import {
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
} from '@/features/stages/stagesApi'
import type { Stage } from '@/features/stages/types'
import type { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const StageEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('stage')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateStageById] = useUpdateStageByIdMutation()
    const { data } = useGetStageByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    title: data.title,
                    subtitle: data.subtitle,
                    imageUrl: data.imageUrl,
                    comment: data.comment,
                    steps: data.steps,
                    stepsText: data.steps?.join('\n\n'),
                    productIds: data?.products?.map((p) => p._id!),
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleUpdateStage = async (stage: Stage) => {
        const { stepsText, ...newStage } = stage
        const steps = stepsText ? stepsText?.split('\n\n') : undefined

        try {
            await updateStageById({
                id: id!,
                stage: { ...newStage, steps },
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/stages/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <StageForm title={t('titles.edit')} onSubmit={handleUpdateStage} />
}
