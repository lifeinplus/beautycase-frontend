import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
import {
    type Stage,
    StageForm,
    useEditStageMutation,
    useGetStageByIdQuery,
} from '../../stages'

export const StageEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editStage] = useEditStageMutation()
    const { data } = useGetStageByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    title: data.title,
                    subtitle: data.subtitle,
                    imageUrl: data.imageUrl,
                    steps: data.steps,
                    stepsText: data.steps?.join('\n\n'),
                    productIds: data?.products?.map((p) => p._id!),
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditStage = async (stage: Stage) => {
        const { stepsText, ...newStage } = stage

        try {
            await editStage({
                id: id!,
                body: {
                    ...newStage,
                    steps: stepsText?.split('\n\n'),
                },
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/stages/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <StageForm title={'Редактировать этап'} onSubmit={handleEditStage} />
}
