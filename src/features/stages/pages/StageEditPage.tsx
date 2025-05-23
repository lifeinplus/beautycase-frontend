import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { StageForm } from '../components/StageForm'
import { useReadStageQuery, useUpdateStageMutation } from '../stagesApi'
import type { Stage } from '../types'

export const StageEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editStage] = useUpdateStageMutation()
    const { data } = useReadStageQuery(id!)

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
            await editStage({
                ...newStage,
                _id: id,
                steps,
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/stages/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <StageForm title={'Редактировать этап'} onSubmit={handleUpdateStage} />
    )
}
