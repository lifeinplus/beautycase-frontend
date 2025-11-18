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
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
} from '@/features/stages/api/stagesApi'
import { StageForm } from '@/features/stages/components/form/StageForm'
import type { Stage } from '@/features/stages/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const StageEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('stage')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateStageById, { isLoading }] = useUpdateStageByIdMutation()
    const { data } = useGetStageByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    title: data.title,
                    subtitle: data.subtitle,
                    imageId: data.imageId,
                    comment: data.comment,
                    steps: data.steps,
                    stepsText: data.steps?.join('\n\n'),
                    productIds: data?.products?.map((p) => p._id!),
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditStage = async (stage: Stage) => {
        const { stepsText, ...newStage } = stage
        const steps = stepsText ? stepsText?.split('\n\n') : undefined

        try {
            await updateStageById({
                id: id!,
                stage: { ...newStage, steps },
            }).unwrap()

            dispatch(clearFormData())
            navigate(ROUTES.backstage.stages.details(id!))
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <StageForm
            title={t('titles.edit')}
            onSubmit={handleEditStage}
            isSaving={isLoading}
        />
    )
}
